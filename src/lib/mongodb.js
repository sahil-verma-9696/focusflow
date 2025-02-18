import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect(); // Ensure the client is connected

    const db = client.db("focusflow");

    // Check if the database exists
    const adminDB = client.db().admin();
    const databases = await adminDB.listDatabases();
    const dbExists = databases.databases.some(db => db.name === "focusflow");

    if (!dbExists) {
      console.warn("⚠️ Database 'focusflow' does not exist. Creating...");
    }

    console.log("✅ Connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("❌ Database Connection Error: " + error.message);
  }
}
