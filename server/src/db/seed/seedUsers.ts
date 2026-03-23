import { db } from "../../utils/db";
import { users } from "../../models/schema";

async function seed() {
  console.log("Seeding started...");
  try {
    const seedUsers = [
      { fullName: "John Doe", email: "john.doe@example.com" },
      { fullName: "Jane Smith", email: "jane.smith@example.com" },
      { fullName: "Alice Johnson", email: "alice.johnson@example.com" },
      { fullName: "Bob Brown", email: "bob.brown@example.com" },
      { fullName: "Charlie Davis", email: "charlie.davis@example.com" },
    ];

    console.log(`Inserting ${seedUsers.length} users...`);
    await db.insert(users).values(seedUsers).onConflictDoNothing();
    
    console.log("Successfully seeded users! 🚀");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    process.exit(0);
  }
}

seed();
