const express = require("express");
const mongoose = require("mongoose");

// 👇 USE IT HERE (Database Configuration)
const MONGO_URL = "mongodb://admin:qwerty@mongo:27017/testdb?authSource=admin";

const app = express();

// 👇 MongoDB Connection
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

app.get("/", (req, res) => {
  res.send("Node + MongoDB + Docker is working!");
});

app.listen(5050, () => {
  console.log("Server running on port 5050");
});
