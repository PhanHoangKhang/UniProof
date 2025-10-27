import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const MentorList = () => {
  const { apiUrl } = useContext(StoreContext);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); //  new state for search type

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await fetch(`${apiUrl}/user/mentors`);
        const data = await res.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentor();
  }, []);

  // Filter mentors dynamically based on search type
  const filteredMentors = mentors.filter((mentor) => {
    if (searchType === "name") {
      return mentor.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    } else if (searchType === "major" && mentor.major) {
      return mentor.major.toLowerCase().includes(searchTerm.toLowerCase().trim());
    }
    else if (searchType === "email" && mentor.email) {
      return mentor.email.toLowerCase().includes(searchTerm.toLowerCase().trim());
    }
    return false;
  });

return (
  <div className="p-6 w-full">
    <h2 className="text-2xl font-bold mb-6 text-center text-[#16456a]">
      Tìm kiếm mentor
    </h2>

    {/*  Search Controls */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
      <input
        type="text"
        placeholder={
          searchType === "name"
            ? "Nhập tên mentor..."
            : searchType === "email" ? "Nhập email..." : 'Nhập chuyên môn...'
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#16456a] bg-white"
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16456a] bg-white"
      >
        <option value="name">Tìm theo tên</option>
        <option value="email">Tìm theo email</option>
        <option value="major">Tìm theo chuyên môn</option>
      </select>
    </div>

    {/*  Loading & Results */}
    {loading ? (
      <div className="flex justify-center items-center py-20">
        <div className="text-lg text-gray-500 animate-pulse">
          Đang tải danh sách mentor...
        </div>
      </div>
    ) : filteredMentors.length === 0 ? (
      <p className="text-center text-gray-500">Không tìm thấy mentor phù hợp.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor._id}
            className="border border-gray-300 rounded-xl shadow-md py-6 px-6 flex flex-col items-center bg-white hover:shadow-lg transition-all duration-200"
          >
            {/* Avatar */}
            <div className="w-20 h-20 bg-[#efbd18] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
              {mentor.name?.charAt(0).toUpperCase()}
            </div>

            {/* Basic Info */}
            <h3 className="text-lg font-semibold text-center">{mentor.name}</h3>
            <p className="text-gray-600 text-sm mb-1">{mentor.email}</p>
            {mentor.major && (
              <p className="text-sm text-[#16456a] font-medium italic mb-3">
                Chuyên môn: {mentor.major}
              </p>
            )}

            {/* Extra Info Section */}
            <div className="w-full text-sm text-gray-700 space-y-2 mb-4">
              {mentor.university && (
                <p>
                  🏫 <span className="font-semibold">Trường:</span>{" "}
                  {mentor.university}
                </p>
              )}
              {mentor.experience && (
                <p>
                  💼 <span className="font-semibold">Kinh nghiệm:</span>{" "}
                  {mentor.experience}
                </p>
              )}
              {mentor.certificates && (
                <p>
                  🎓 <span className="font-semibold">Chứng chỉ:</span>{" "}
                  {mentor.certificates}
                </p>
              )}
              {mentor.description && (
                <p className="text-gray-600 italic line-clamp-3">
                  “{mentor.description}”
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-2 w-full justify-center items-center">
              <Link
                to={`/dashboard/meeting/book/${mentor._id}`}
                className="bg-[#368cd1] text-white px-4 py-2 rounded-lg text-center hover:bg-[#efbd18] transition-all"
              >
                Đặt lịch
              </Link>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default MentorList;
