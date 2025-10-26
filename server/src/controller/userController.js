import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../model/user.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Mật khẩu hoặc email không đúng" });
    }
    const token = createToken(user._id);
    
    res.json({
      success: true,
      message: "Đăng nhập thành công",
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
      return res.json({ success: false, message: "Người dùng đã tồn tại, vui lòng nhập email khác"});
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Vui lòng nhập email hợp lệ",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Độ dài mật khẩu không được ngắn hơn 8 kí tự",
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
      message: "Đăng kí thành công!",
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
  const { userId, name, major, description, university, experience } = req.body; // userId can come from token or request body

  try {
    // Build dynamic update object
    const updateData = {};

    if (name !== undefined) {
      if (!name.trim() || name.trim().length < 2) {
        return res.json({
          success: false,
          message: "Tên người dùng phải từ 2 kí tự trở lên",
        });
      }
      updateData.name = name.trim();
    }

    if (major !== undefined) {
      if (!major.trim()) {
        return res.json({
          success: false,
          message: "Chuyên ngành không được bỏ trống",
        });
      }
      updateData.major = major.trim();
    }

    if (experience !== undefined) {
      if (!experience.trim()) {
        return res.json({
          success: false,
          message: "Kinh nghiệm không được bỏ trống",
        });
      }
      updateData.experience = experience.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.json({
          success: false,
          message: "Giới thiệu không được bỏ trống",
        });
      }
      updateData.description = description.trim();
    }

    if (university !== undefined) {
      if (!university.trim()) {
        return res.json({
          success: false,
          message: "học vấn không được bỏ trống",
        });
      }
      updateData.university = university.trim();
    }

    // If no field provided
    if (Object.keys(updateData).length === 0) {
      return res.json({
        success: false,
        message: "Vui lòng nhập thông tin cần cập nhật",
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
      message: "Cập nhật thông tin thành công!",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        major: updatedUser.major,
        role: updatedUser.role,
        description: updatedUser.description,
        university: updatedUser.university,
        experience: updatedUser.experience,
        
      },
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error updating user info." });
  }
};

export { loginUser, registerUser, updateUserInfo };
