import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Confirm = ({ buttonClass, text, setUser }) => {
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();

  // Log out handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <button onClick={() => setPopUp(true)} className={buttonClass}>
        {text}
      </button>
      {popUp && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-999">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-8 w-96 relative animate-fadeIn">
            <button
              onClick={() => setPopUp(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-center mb-6 text-[#368cd1]">
              Bạn có chắc chắn muốn đăng xuất không?
            </h2>
            <div className="flex flex-row gap-5 justify-between px-10">
              <button
                onClick={() => setPopUp(false)}
                className="bg-[#ebebeb] hover:bg-[#dcdcdc] 
                        py-3 px-7 rounded-lg font-semibold"
              >
                Không
              </button>
              <button
                onClick={handleLogout}
                className="bg-[red] text-white py-3 px-7 
                        rounded-lg font-semibold"
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirm;
