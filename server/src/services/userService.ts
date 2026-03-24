import { db } from "../utils/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";

export const signupUser = async (fullName: string, email: string, password?: string) => {
  let hashedPassword = password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email));
  if (existingUser.length > 0) throw new Error("User already exists");

  const result = await db.insert(users).values({ fullName, email, password: hashedPassword }).returning();

  if (!result || result.length === 0) {
    console.error("❌ Insertion failed: No user returned");
    throw new Error("Failed to create user");
  }

  const newUser = result[0];
  console.log("✅ User created successfully:", newUser.email);
  return newUser;
};

export const loginUser = async (email: string, password?: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));
  const user = result[0];
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password || "", user.password || "");
  if (!isValid) throw new Error("Invalid password");

  const token = generateToken(user.id);
  return { token, user };
};

export const getAllUsers = async () => {
  return await db.select().from(users);
};

export const getUserById = async (id: number) => {
  const result = await db.select().from(users).where(eq(users.id, id));
  return result[0] || null;
};

export const getMe = async (userId: number) => {
  const result = await db.select().from(users).where(eq(users.id, userId));
  return result[0] || null;
};
