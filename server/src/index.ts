import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql";
import { resolvers } from "./graphql/resolvers";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import cors from 'cors';
import { verifyToken } from "./utils/auth";

const app = express();
const port = 4000;

interface MyContext {
  user: { userId: number } | null;
}

async function startServer() {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  // 1. REST Endpoints
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);

  // 2. GraphQL Endpoint
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        const user = verifyToken(token.replace("Bearer ", ""));
        return { user };
      },
    })
  );

  app.listen(port, () => {
    console.log(`🚀 REST API: http://localhost:${port}/api`);
    console.log(`🚀 GraphQL:  http://localhost:${port}/graphql`);
  });
}

startServer();