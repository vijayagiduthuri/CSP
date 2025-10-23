import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// Clerk integration removed temporarily to avoid import/runtime issues.
// To re-enable Clerk, import `clerkClient` from '@clerk/clerk-sdk-node' and the
// middleware from '@clerk/express' per the package docs and add the protected route back.
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
app.use(cors());
app.use(express.json());

// NOTE: Clerk-protected user endpoint removed for now. Re-add after verifying
// the correct middleware export name from @clerk/express.

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
