import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;
  // console.log("Username---->", username, "Password----->", password);

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // console.log("Login TOken ---->", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const seedAdmin = async (req, res) => {
  try {
    const adminExists = await User.findOne({
      username: process.env.ADMIN_USERNAME,
    });
    if (adminExists) {
      return res.status(200).json({ message: "Admin user already exists" });
    }

    const admin = new User({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    await admin.save();
    res.status(201).json({ message: "Admin user seeded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding admin user", error: error.message });
  }
};
