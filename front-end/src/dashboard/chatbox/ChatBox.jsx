import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Send } from "lucide-react";

const socket = io("http://localhost:3000");

export default function ChatBox({ currentUser, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef();

  // Fetch previous messages
  useEffect(() => {
    if (!selectedUser) return;
    axios
      .get(`http://localhost:3000/api/chat/${currentUser._id}/${selectedUser._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [selectedUser]);

  // Socket setup
  useEffect(() => {
    if (selectedUser) socket.emit("joinRoom", currentUser._id);

    socket.on("receiveMessage", (msg) => {
      if (
        (msg.senderId === selectedUser._id && msg.receiverId === currentUser._id) ||
        (msg.senderId === currentUser._id && msg.receiverId === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!content.trim()) return;

    const msgData = {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      content,
    };

    try {
      await axios.post("http://localhost:3000/api/chat", msgData);
      socket.emit("sendMessage", msgData);
      setMessages((prev) => [...prev, msgData]);
      setContent("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-full  backdrop-blur-md rounded-xl shadow-md border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-[#111827]/80 border-b border-gray-700">
        <div className="w-10 h-10 bg-[#efbd18] rounded-full flex items-center justify-center text-white text-xl font-bold">
              {selectedUser.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex items-center">
          <h3 className="text-white font-semibold">{selectedUser.name}</h3>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {messages.map((m, i) => {
          const isMine = m.senderId === currentUser._id;
          return (
            <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                  isMine
                    ? "bg-gradient-to-r from-[#efbd18] to-[#f6d65b] text-black rounded-br-none"
                    : "bg-[#1f2937] text-gray-200 rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700 bg-[#111827]/80">
        <div className="flex items-center bg-[#1f2937] rounded-full px-4 py-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-gray-200 text-sm focus:outline-none placeholder-gray-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-[#efbd18] hover:bg-[#f3c92d] text-black p-2 rounded-full transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
