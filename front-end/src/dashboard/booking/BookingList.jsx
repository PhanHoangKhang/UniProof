import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { Link } from "react-router-dom";

const BookingList = () => {
  const { user } = useContext(StoreContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useContext(StoreContext);

  useEffect(() => {
    if (!user?._id) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/bookings/${user._id}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;
  if (bookings.length === 0) return <p className="text-center text-gray-600">Bạn chưa có lịch đặt nào.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-[#16456a] mb-6 text-center">
        Danh sách lịch đặt
      </h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-[#16456a]">
                Mentor: {booking.mentor?.name || "N/A"}
              </p>
              <p className="font-semibold text-[#16456a]">
                Student: {booking.student?.name || "N/A"}
              </p>
              <br></br>
              <p className="text-gray-600">
                Ngày meeting: {new Date(booking.date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-600">Vào lúc: {booking.timeSlot}</p>
              <div className="mt-5">
                <Link to={`/dashboard/submitted/seetext/${booking._id}`} className="text-[#368cd1] 
                font-semibold hover:underline">Xem bài viết</Link>
              </div>
            </div>
            <span
              className={`font-bold px-3 py-1 rounded-lg ${
                booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status || "Chưa xác định"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
