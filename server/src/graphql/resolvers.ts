import { db } from "../utils/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";

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
    createUser: async (_: any, { fullName, email }: { fullName: string; email: string }) => {
      const result = await db.insert(users).values({ fullName, email }).returning();
      return result[0];
    },
  },
};