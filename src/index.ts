import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(express.json({}));
app.use(cors());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});
