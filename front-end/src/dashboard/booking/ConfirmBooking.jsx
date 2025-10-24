import React, { useState } from "react";

const ConfirmBooking = ({ buttonClass, text, onConfirm }) => {
  const [popUp, setPopUp] = useState(false);

  const handleBooking = () => {
    if (onConfirm) onConfirm(); // call parent’s handleSubmit
    setPopUp(false);
  };

  return (
    <div>
      {/* Main trigger button */}
      <button onClick={() => setPopUp(true)} className={buttonClass}>
        {text}
      </button>
      {/* Popup modal */}
      {popUp && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[999]">
          <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8 w-96 relative">
            <button
              onClick={() => setPopUp(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6 text-[#368cd1]">
              Xác nhận đặt lịch?
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Hãy kiểm tra lại thông tin trước khi xác nhận.
            </p>
            <div className="flex flex-row justify-center gap-5">
              <button
                onClick={() => setPopUp(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleBooking}
                className="bg-[#1d72b8] hover:bg-[#155d8b] text-white font-semibold py-2 px-6 rounded-lg"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmBooking;