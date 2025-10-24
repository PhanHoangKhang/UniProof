import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
