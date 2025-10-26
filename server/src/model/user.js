import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: {
      type: String,
      enum: ["Student", "Mentor"],
      default: "Student",
    },
    major: {
      type: String,
    },
    description: {
      type: String,
    },
    university: { type: String },
    experience: { type: String }, // in years
    certificates: { type: String },
    languages: {type: String} // array of certificate names
  },
  { timestamps: true }
);

//  Model name should match the ref in Booking.js → "User"
const User = mongoose.model("User", userSchema);

export default User;
