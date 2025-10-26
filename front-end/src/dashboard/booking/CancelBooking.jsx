import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CancelBooking = ({bookingId, buttonClass, text}) => {
    const [popUp, setPopUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleCancel = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
            method: "DELETE",
            });
            const data = await res.json();
            navigate("/dashboard/submitted");
        } catch (error) {
            console.error("Error cancelling booking:", error);
        } finally {
        setLoading(false);
        }
    };

  return (
    <div>
        <button onClick={() => setPopUp(true)} className={buttonClass}>{text}</button>
        {/* Popup modal */}
        {popUp && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
            <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-96 relative">
                <button
                onClick={() => setPopUp(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                ✕
                </button>
                <h2 className="text-2xl font-semibold text-center mb-6 text-[#368cd1]">
                Xác nhận hủy lịch?
                </h2>
                <div className="flex flex-row justify-center gap-5">
                <button
                    onClick={() => setPopUp(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg"
                >
                    Hủy
                </button>

               <button
                    onClick={handleCancel}
                    disabled={loading}
                    className={`${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[red] hover:bg-[#b70707]"
                    } text-white font-semibold py-2 px-6 rounded-lg`}
                >
                    {loading ? "Đang hủy..." : "Xác nhận"}
                </button>

                </div>
            </div>
            </div>
        )}
    </div>
  )
}

export default CancelBooking