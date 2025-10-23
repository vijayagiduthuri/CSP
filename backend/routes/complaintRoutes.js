import express from "express";
import {
  raiseComplaint,
  getAllComplaints,
  getComplaintsByUser,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import upload from "../middlewares/fileUploader.js";

const router = express.Router();

router.post("/create",upload.single("image"), raiseComplaint); // Raise complaint
router.get("/", getAllComplaints); // Admin view all
router.get("/user/:id", getComplaintsByUser); // User's complaints
router.put("/update/:id", updateComplaintStatus); // Update complaint status

export default router;
