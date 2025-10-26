import React, { useEffect, useState, useContext } from "react";
import ChatBox from "./ChatBox";
import { StoreContext } from "../../Context/StoreContext";

const ChatPage = () => {
  const { user } = useContext(StoreContext); // logged-in user
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useContext(StoreContext);

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

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase().trim());  
  });

  return (
    <div className="flex h-[100vh] rounded-2xl overflow-hidden shadow-2xl border py-10 px-15 ">
      {/* LEFT SIDEBAR - User List */}
      <div className="w-1/4 bg-[#16456a] backdrop-blur-md text-white border-r border-gray-700 
      flex flex-col rounded-tl-xl rounded-bl-xl">
        <div className="p-5 border-b border-gray-700 flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <h2 className="font-semibold text-lg text-[#efbd18]">Chat Forum</h2>
        </div>

        {/* Search Box */}
        <div className="px-4 py-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)}
            placeholder="Search user..."
            className="w-full px-3 py-2 rounded-full bg-[#1f2937] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#efbd18]"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-4 text-gray-400 text-sm">Loading users...</p>
          ) : (
            <ul>
              {filteredUsers.map((u) => (
                <li
                  key={u._id}
                  onClick={() => setSelectedUser(u)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${
                    selectedUser?._id === u._id
                      ? "bg-[#efbd18]/30 border-l-4 border-[#efbd18]"
                      : "hover:bg-[#1f2937]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{u.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* CENTER CHAT AREA */}
      <div className="flex-1 flex flex-col backdrop-blur-md relative">
        {selectedUser ? (
          <ChatBox currentUser={user} selectedUser={selectedUser} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-sm">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
