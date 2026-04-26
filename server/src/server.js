import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { connectDB } from "./config/db.js";
import memberRoutes from "./routes/memberRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
const teamName = process.env.TEAM_NAME || "Visionary Coders";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", teamName });
});

app.get("/api/team", (_req, res) => {
  res.json({ teamName });
});

app.use("/api/members", memberRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Internal server error",
  });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
