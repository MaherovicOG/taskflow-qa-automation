import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql";
import { resolvers } from "./graphql/resolvers";
import userRouter from "./routes/userRoutes";
import cors from 'cors'

const app = express();
const port = 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  // 1. REST Endpoints
  app.use("/api/users", userRouter);

  // 2. GraphQL Endpoint
  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`🚀 REST API: http://localhost:${port}/api`);
    console.log(`🚀 GraphQL:  http://localhost:${port}/graphql`);
  });
}

startServer();