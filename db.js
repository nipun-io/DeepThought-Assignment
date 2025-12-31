
require('dotenv').config({ quiet: true });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

let db = null;

async function connectToDatabase() {
  if (db) return db;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("DTAssignment");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
