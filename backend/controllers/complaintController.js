import Complaint from "../models/complaint.js";

// Raise a new complaint
export const raiseComplaint = async (req, res) => {
  try {
    const { userId, title, description, location } = req.body;

    // Initialize base64 string
    let imageUrl = "";

    if (req.file) {
      // Convert uploaded file buffer directly to base64
      imageUrl = req.file.buffer.toString("base64");
    }

    const complaint = await Complaint.create({
      userId,
      title,
      description,
      location,
      imageUrl, // store base64 string in DB
    });

    res
      .status(201)
      .json({ message: "Complaint raised successfully", complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all complaints (Admin)
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get complaints by user
export const getComplaintsByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const complaints = await Complaint.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update complaint status (Admin)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Status updated successfully", complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
