import { Router } from "express";
import { db } from "../utils/db";
import { users } from "../models/schema";

const router = Router();

router.get("/", async (req, res) => {
  const allUsers = await db.select().from(users);
  res.json(allUsers);
});

export default router;