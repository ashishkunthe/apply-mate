import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});
