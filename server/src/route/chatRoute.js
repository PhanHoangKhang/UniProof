import express from "express";
import Message from "../model/Message.js";

const chatRoute = express.Router();

// Get conversation between two users
chatRoute.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 },
    ],
  }).sort({ createdAt: 1 });
  res.json(messages);
});

// Save new message
chatRoute.post("/", async (req, res) => {
  const newMsg = new Message(req.body);
  await newMsg.save();
  res.status(201).json(newMsg);
});

export default chatRoute;
