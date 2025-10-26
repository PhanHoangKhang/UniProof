import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { use } from "react";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const { apiUrl } = useContext(StoreContext);
  const [university, setUniversity] = useState('')
  const [experience, setExperience] = useState('')
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setName(res.data.user.name);
        setMajor(res.data.user.major || "");
        setDescription(res.data.user.description || "")
        setUniversity(res.data.user.university || "")
        setExperience(res.data.user.experience || "")
        
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    if (!user?._id) return;
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${apiUrl}/user/update`,
        {
          userId: user._id,
          name: name !== user.name ? name : undefined,
          major: major !== user.major ? major : undefined,
          description: description !== user.description ? description : undefined,
          university: university !== user.university ? university : undefined,
          experience: experience !== user.experience ? experience : undefined,
          
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setEditing(false);
        setMessage({ text: res.data.message, type: "success" });
      } else {
        setMessage({ text: res.data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      setMessage({ text: "Lỗi khi cập nhật thông tin.", type: "error" });
    }
    // Clear message after 3s
    setTimeout(() => setMessage(""), 3000);
  };

  if (!user) return <p className="text-center mt-10">Đang tải thông tin...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-3xl font-bold text-[#368cd1] mb-6">
        Thông tin tài khoản
      </h2>

      {message && (
        <p className={`mb-4 font-semibold ${ message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      <div className="border border-gray-400 rounded-lg p-6 w-[400px] shadow-md bg-white">
        <div className="mb-4">
          <label className="font-semibold block mb-1">Tên người dùng:</label>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#368cd1]"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Chuyên ngành:</label>
          {editing ? (
            <input
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#368cd1]"
            />
          ) : (
            <p>{user.major || "Chưa cập nhật"}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Học vấn:</label>
          {editing ? (
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#368cd1]"
            />
          ) : (
            <p>{user.university || "Chưa cập nhật"}</p>
          )}
        </div>

         <div className="mb-4">
          <label className="font-semibold block mb-1">Kinh nghiệm:</label>
          {editing ? (
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#368cd1]"
            />
          ) : (
            <p>{user.experience || "Chưa cập nhật"}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-1">Giới thiệu:</label>
          {editing ? (
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#368cd1]"
            />
          ) : (
            <p>{user.description || "Chưa cập nhật"}</p>
          )}
        </div>

        

        

        

        <div className="mb-4">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Role:</span> {user.role}</p>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-[#368cd1] text-white px-4 py-2 rounded-md hover:bg-[#efbd18] transition"
              >
                Lưu thay đổi
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Hủy
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#368cd1] text-white px-4 py-2 rounded-md hover:bg-[#efbd18] transition"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
