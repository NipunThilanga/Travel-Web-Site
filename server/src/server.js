import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ status: "ok", service: "Sri Lanka Rentals API" });
});

app.use("/api", apiRoutes);

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed, running without DB:", error.message);
    }
  } else {
    console.log("MONGODB_URI not provided, running without persistent storage.");
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
