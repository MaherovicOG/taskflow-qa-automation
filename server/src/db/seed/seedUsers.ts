import { db } from "../../utils/db";
import { users } from "../../models/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding started...");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const seedUsers = [
      { fullName: "John Doe", email: "john.doe@example.com", password: hashedPassword },
      { fullName: "Jane Smith", email: "jane.smith@example.com", password: hashedPassword },
      { fullName: "Alice Johnson", email: "alice.johnson@example.com", password: hashedPassword },
      { fullName: "Bob Brown", email: "bob.brown@example.com", password: hashedPassword },
      { fullName: "Charlie Davis", email: "charlie.davis@example.com", password: hashedPassword },
    ];

    console.log(`Clearing existing users...`);
    await db.delete(users);

    console.log(`Inserting ${seedUsers.length} users with hashed passwords...`);
    await db.insert(users).values(seedUsers);
    
    console.log("Successfully seeded users! 🚀");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    process.exit(0);
  }
}

seed();
