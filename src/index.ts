import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "hello there" });
});

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});

app.listen(PORT);
