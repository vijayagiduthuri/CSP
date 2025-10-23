import User from "../models/user.js";

// Clerk Google Auth - Register/Login User
export const clerkRegister = async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if user already exists
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        name,
        email,
        role: "user",
      });
    }

    res.status(200).json({
      message: "Clerk user synced successfully",
      user,
    });
  } catch (error) {
    console.error("Error in clerkRegister:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
