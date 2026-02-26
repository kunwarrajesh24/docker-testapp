const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

const PORT = 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Use container name 'mongo' as hostname
const MONGO_URL = "mongodb://admin:qwerty@mongo:27017/?authSource=admin";
const client = new MongoClient(MONGO_URL);

// Connect once
async function main() {
  try {
    await client.connect();
    console.log("✔️ Connected to MongoDB");

    const db = client.db("apnacollege-db");

    // GET all users
    app.get("/getUsers", async (req, res) => {
      const data = await db.collection("users").find({}).toArray();
      res.json(data);
    });

    // POST new user
    app.post("/addUser", async (req, res) => {
      const userObj = req.body;
      const result = await db.collection("users").insertOne(userObj);
      res.json({ inserted: result.insertedId });
    });

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
