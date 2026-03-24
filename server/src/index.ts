import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql";
import { resolvers } from "./graphql/resolvers";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import cors from 'cors';
import { verifyToken } from "./utils/auth";
import { db } from "./utils/db";
import { sql } from "drizzle-orm";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = process.env.PORT || 7000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "API Documentation for TaskFlow QA Automation Server",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

interface MyContext {
  user: { userId: number } | null;
}

async function startServer() {
  // Database Health Check
  try {
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database: Connected and healthy");
  } catch (error) {
    console.error("❌ Database: Connection failed", error);
  }

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  // Swagger Documentation
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
    console.log(`📄 Swagger:  http://localhost:${port}/api-docs`);
  });
}

startServer();