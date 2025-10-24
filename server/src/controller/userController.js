import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../model/user.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ success: false, message: "User does not exist !!!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid info" });
    }
    const token = createToken(user._id);
    
    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error !!!" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, password, email, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    // check user if they have already existed
    if (exists) {
      return res.json({ success: false, message: "User already existed !!!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email !!!",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "The password must not be less than 8 characters !!!",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "Register successful!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error !!!" });
  }
};

// Update user name or major (only the provided fields)
const updateUserInfo = async (req, res) => {
  const { userId, name, major, description } = req.body; // userId can come from token or request body

  try {
    // Build dynamic update object
    const updateData = {};

    if (name !== undefined) {
      if (!name.trim() || name.trim().length < 2) {
        return res.json({
          success: false,
          message: "Name must be at least 2 characters long.",
        });
      }
      updateData.name = name.trim();
    }

    if (major !== undefined) {
      if (!major.trim()) {
        return res.json({
          success: false,
          message: "Major cannot be empty.",
        });
      }
      updateData.major = major.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.json({
          success: false,
          message: "Description cannot be empty.",
        });
      }
      updateData.description = description.trim();
    }
    // If no field provided
    if (Object.keys(updateData).length === 0) {
      return res.json({
        success: false,
        message: "No valid field provided for update.",
      });
    }
    // Find and update user
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, // return updated user
    });

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found." });
    }

    return res.json({
      success: true,
      message: "User information updated successfully!",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        major: updatedUser.major,
        role: updatedUser.role,
        description: updatedUser.description,
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error updating user info." });
  }
};


export { loginUser, registerUser, updateUserInfo };
