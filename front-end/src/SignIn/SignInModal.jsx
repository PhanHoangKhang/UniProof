import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const SignInModal = ({ buttonClass, text }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { user, setUser } = useContext(StoreContext);
  const { apiUrl } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // start loading
    setMessage("");   // clear old message

    const data = isLogin
      ? { email, password }
      : { name, email, password, role };

    let url = `${apiUrl}/user`;
    url += isLogin ? "/login" : "/register";

    try {
      const response = await axios.post(url, data);

      setTimeout(() => {
        // stop loading *after slight delay* for smoother UX
        setLoading(false);

        if (response.data.success) {
          // show message after loading ends
          setMessage({ text: response.data.message, type: "success" });

          // Save token and user info
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);

          // Close popup and navigate
          setTimeout(() => {
            setShowPopup(false);
          }, 1500);
        } else {
          setMessage({ text: response.data.message, type: "error" });
        }
        // Auto clear message after 2.5s
        setTimeout(() => setMessage(""), 2500);
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false);
      setMessage({ text: "Đã xảy ra lỗi. Vui lòng thử lại!", type: "error" });
    }
  };
  
  return (
    <div className="relative">
      {/* Navigate to dashboard if a user is logging */}
      <button
        onClick={() => {
          setShowPopup(true);
          if (user) {
            navigate("/dashboard");
          }
        }}
        className={buttonClass}
      >
        {text}
      </button>

      {/* Popup */}
      {!user && showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-8 w-96 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6 text-[#368cd1]">
              {isLogin ? "Đăng nhập UniProof" : "Đăng kí UniProof"}
            </h2>

            <form onSubmit={onLogin} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Họ và tên của bạn"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">
                      Role
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="Student"
                          checked={role === "Student"}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        Student
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="Mentor"
                          checked={role === "Mentor"}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        Mentor
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 mb-1 font-bold">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456@gmail.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-bold">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mật Khẩu"
                />
              </div>

              {message && (
                <p className={`mb-4 text-center text-sm font-semibold ${ message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-semibold transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#368cd1] hover:bg-[#efbd18] text-white"
                }`}
              >
                {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng kí"}
              </button>

            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setPassword("");
                  setName("");
                  setIsLogin(!isLogin);
                }}
                className="text-blue-700 hover:underline"
              >
                {isLogin ? "Đăng kí" : "Đăng nhập"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInModal;
