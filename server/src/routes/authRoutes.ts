import { Router } from "express";
import { db } from "../utils/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth";

const router = Router();

// Signup
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await db.insert(users).values({ fullName, email, password: hashedPassword }).returning();
    const newUser = result[0];
    const token = generateToken(newUser.id);
    res.json({ token, user: newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password || "");
    if (!isValid) return res.status(401).json({ error: "Invalid password" });

    const token = generateToken(user.id);
    res.json({ token, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
