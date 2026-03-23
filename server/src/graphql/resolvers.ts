import { db } from "../utils/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/auth";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await db.select().from(users);
    },
    getUserById: async (_: any, { id }: { id: number }) => {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0] || null;
    },
    me: async (_: any, __: any, { user }: { user: { userId: number } | null }) => {
      if (!user) return null;
      const result = await db.select().from(users).where(eq(users.id, user.userId));
      return result[0] || null;
    },
  },
  Mutation: {
    signup: async (_: any, { fullName, email, password }: any) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await db.insert(users).values({ fullName, email, password: hashedPassword }).returning();
      const newUser = result[0];
      const token = generateToken(newUser.id);
      return { token, user: newUser };
    },
    login: async (_: any, { email, password }: any) => {
      const result = await db.select().from(users).where(eq(users.email, email));
      const user = result[0];
      if (!user) throw new Error("User not found");
      const isValid = await bcrypt.compare(password, user.password || "");
      if (!isValid) throw new Error("Invalid password");
      const token = generateToken(user.id);
      return { token, user };
    },
    createUser: async (_: any, { fullName, email, password }: { fullName: string; email: string; password?: string }) => {
      let hashedPassword = password;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
      const result = await db.insert(users).values({ fullName, email, password: hashedPassword }).returning();
      return result[0];
    },
  },
};