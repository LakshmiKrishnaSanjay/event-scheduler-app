const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

let db;
let client;

const connectDB = async () => {
  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(); // Optional: specify DB name: client.db('event-scheduler')
    console.log("✅ MongoDB connected successfully");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

module.exports = connectDB;
