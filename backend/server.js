import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import fs from "fs";
import path from "path";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Ensure uploads directory exists (required by multer storage)
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: ["https://csp-kappa.vercel.app","http://localhost:5173"], // add your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);

// Basic health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
