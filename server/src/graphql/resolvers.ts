import { signupUser, loginUser, getAllUsers, getUserById, getMe } from "../services/userService";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await getAllUsers();
    },
    getUserById: async (_: any, { id }: { id: number }) => {
      return await getUserById(id);
    },
    me: async (_: any, __: any, { user }: { user: { userId: number } | null }) => {
      if (!user) return null;
      return await getMe(user.userId);
    },
  },
  Mutation: {
    signup: async (_: any, { fullName, email, password }: any) => {
      return await signupUser(fullName, email, password);
    },
    login: async (_: any, { email, password }: any) => {
      return await loginUser(email, password);
    },
    createUser: async (_: any, { fullName, email, password }: { fullName: string; email: string; password?: string }) => {
      return await signupUser(fullName, email, password);
    },
  },
};