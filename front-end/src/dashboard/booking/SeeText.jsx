import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SeeText = () => {
  const { bookingId } = useParams();
  const [ booking, setBooking ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/bookings/info/${bookingId}`);
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;
  if (!booking) return <p className="text-center text-gray-600">Không tìm thấy thông tin đặt lịch.</p>;

  return (
    <>
        <Link to='/dashboard/submitted' className='text-[#368cd1]'>Quay về</Link>
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-[#16456a] mb-4 text-center">Chi tiết lịch đặt</h2>

        <div className="space-y-3">
            <p><strong>Tiêu đề:</strong> {booking.title || "Không có tiêu đề"}</p>
            <p><strong>Ghi chú:</strong> {booking.notes || "Không có ghi chú"}</p>
            <p><strong>Ngày:</strong> {new Date(booking.date).toLocaleDateString("vi-VN")}</p>
            <p><strong>Thời gian:</strong> {booking.timeSlot}</p>
            {/*  Display text content if available */}
            {booking.text && (
            <div className="bg-gray-50 p-4 rounded-lg border mt-3">
                <h3 className="font-semibold text-[#16456a] mb-2">Nội dung bài viết:</h3>
                <p className="text-gray-700 whitespace-pre-line">{booking.text}</p>
            </div>
            )}
            
        </div>
        </div>
    </>
  );
};

export default SeeText;
