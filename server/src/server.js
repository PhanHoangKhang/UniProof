import express from 'express';
import cors from 'cors';
import http from "http";
import { Server } from "socket.io";
import connect from './config/db.js';
import userRouter from './route/userRouter.js';
import dotenv from 'dotenv'
import grammarRoute from './route/grammarRoute.js';
import meetingRouter from './route/meetingRoute.js';
import chatRoute from './route/chatRoute.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT
const server = http.createServer(app);
// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// connect db
connect()  

const io = new Server(server, {
  cors: {
    origin: "https://uniproof-frontend.onrender.com", // your frontend
    methods: ["GET", "POST"],
  },
});
// --- socket logic ---
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", (messageData) => {
    // messageData: { senderId, receiverId, content }
    io.to(messageData.receiverId).emit("receiveMessage", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
// Basic test route
app.get('/', (req, res) => {
  res.send('🚀 Express server is running!');
});
app.use('/user', userRouter)
app.use("/api", grammarRoute);
app.use('/api/bookings', meetingRouter)
app.use("/api/chat", chatRoute)
// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
