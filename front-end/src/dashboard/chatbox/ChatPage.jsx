import React, { useEffect, useState, useContext } from "react";
import ChatBox from "./ChatBox";
import { StoreContext } from "../../Context/StoreContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { user } = useContext(StoreContext); // logged-in user
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/user`);
        const data = await res.json();
        const filtered = data.filter((u) => u._id !== user._id);
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchUsers();
  }, [user]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="flex h-[100vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-white to-[#f3f8fc]">
      {/* LEFT SIDEBAR */}
      <div className="w-1/4 bg-[#368cd1]/90 text-white flex flex-col border-r border-white/30 rounded-tl-2xl rounded-bl-2xl shadow-lg">
        <div className="p-5 border-b border-white/30 flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <h2 className="font-semibold text-lg text-[#efbd18]">Chat Forum</h2>
        </div>

        {/* Search Box */}
        <div className="px-4 py-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm người dùng..."
            className="w-full px-3 py-2 rounded-full bg-white/20 placeholder-white/70 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#efbd18]"
          />
        </div>

        {/* User List */}
        <div className="flex-1 flex flex-col justify-between">
            <div className="overflow-y-auto h-[90%]">
                {loading ? (
                    <p className="p-4 text-white/70 text-sm">Đang tải người dùng...</p>
                ) : (
                    <ul>
                    {filteredUsers.map((u) => (
                        <li
                        key={u._id}
                        onClick={() => setSelectedUser(u)}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${
                            selectedUser?._id === u._id
                            ? "bg-white/25 border-l-4 border-[#efbd18]"
                            : "hover:bg-white/10"
                        }`}
                        >
                        <div className="w-9 h-9 bg-[#efbd18] rounded-full flex items-center justify-center text-[#16456a] text-lg font-bold">
                            {u.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm text-white">
                            {u.name}
                            </span>
                        </div>
                        </li>
                    ))}
                    </ul>
                )}
            
            </div>

            <div className="h-[10%] flex justify-left items-center mx-5">
                <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-[#efbd18] hover:text-[#f8d94b] transition-colors">
                    <ArrowLeft size={20} /><span className="text-lg font-semibold">Back to Dashboard</span>
                </button>
            </div>
        </div>
      </div>

      {/* CENTER CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-sm relative text-[#16456a]">
        {selectedUser ? (
          <ChatBox currentUser={user} selectedUser={selectedUser} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-sm">Chọn người dùng để bắt đầu trò chuyện</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
