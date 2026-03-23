import { db } from "../utils/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await db.select().from(users);
    },
    getUserById: async (_: any, { id }: { id: number }) => {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0] || null;
    },
  },
  Mutation: {
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