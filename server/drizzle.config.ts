import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./src/models/schema.ts", // Path to your schema
  out: "./drizzle",                // Where migrations will be stored
  dialect: "postgresql",           // Database engine
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});