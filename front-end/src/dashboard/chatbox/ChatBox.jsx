import React, { useEffect, useState, useRef, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { io } from "socket.io-client";
import axios from "axios";
import { Send } from "lucide-react";

export default function ChatBox({ currentUser, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef();
  const { apiUrl } = useContext(StoreContext);
  const socket = io(`${apiUrl}`);

  // Fetch previous messages
  useEffect(() => {
    if (!selectedUser) return;
    axios
      .get(`${apiUrl}/api/chat/${currentUser._id}/${selectedUser._id}`)
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
      await axios.post(`${apiUrl}/api/chat`, msgData);
      socket.emit("sendMessage", msgData);
      setMessages((prev) => [...prev, msgData]);
      setContent("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f2fafc] border-l border-[#efbd18]/20 rounded-tr-xl rounded-br-xl shadow-inner backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#0b1725]/90 to-[#12283a]/90 border-b border-[#efbd18]/20">
        <div className="w-10 h-10 bg-[#efbd18] rounded-full flex items-center justify-center text-[#0b1725] text-xl font-bold shadow-md">
          {selectedUser.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-lg tracking-wide">
            {selectedUser.name}
          </h3>
          <p className="text-gray-400 text-xs">Online now</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-[#efbd18]/40 scrollbar-track-transparent">
        {messages.map((m, i) => {
          const isMine = m.senderId === currentUser._id;
          return (
            <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2 text-sm rounded-2xl shadow-sm ${
                  isMine
                    ? "bg-[#efbd18] text-[#0b1725] rounded-br-none"
                    : "bg-[#142537]/80 text-gray-100 border border-[#efbd18]/10 rounded-bl-none"
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
      <div className="p-3 border-t border-[#efbd18]/20 bg-[#0b1725]/80">
        <div className="flex items-center bg-[#142537]/70 border border-[#efbd18]/30 rounded-full px-4 py-2 backdrop-blur-sm">
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
            className="ml-2 bg-[#efbd18] hover:bg-[#f8d94b] text-[#0b1725] p-2 rounded-full shadow-md transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
