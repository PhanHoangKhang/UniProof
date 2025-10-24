import React, { useEffect, useState } from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import Confirm from "../SignIn/Confirm";
import logo from "/logo.png";
import { Menu, X } from "lucide-react";
import axios from "axios";

const UserDashboard = () => {
  const [userName, setUserName] = useState("bạn");
  const [userEmail, setUserEmail] = useState("");
  const { setUser } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.user.name);
        setUserEmail(res.data.user.email);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUser();
  }, []);

  const handleClose = () => {
    const menu = document.querySelector(".animate-slideDown");
    if (menu) {
      menu.classList.replace("animate-slideDown", "animate-slideUp");
      setTimeout(() => setOpen(false), 400);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed w-full flex justify-between items-center bg-[#16456a] py-4 px-8 text-white border-2 border-[#faca0b]">
        <a href="/" className="flex flex-row justify-center items-center gap-3 font-bold text-2xl">
          <img src={logo} width="45" height="45" alt="Logo" />
          <span>
            Uni<span className="text-[#efbd18]">Proof</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-4"> 
          <Link to="/chat" className='bg-[#efbd18] rounded-lg py-2 px-3 font-semibold'>
          Chat forum
          </Link> 
        </div>

        <button
          className="w-8 h-8 flex items-center justify-center text-2xl md:hidden"
          onClick={() => {
            if (open) {
              handleClose(); // play close animation
            } else {
              setOpen(true); // open instantly
            }
          }}
          id="hamburger"
        >
          {open ? <X size={35} /> : <Menu size={35} />}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 mt-20 overflow-hidden border-t border-black">
        {/* Sidebar */}
        <aside className="hidden w-[20%] border-r border-black md:flex md:flex-col justify-between overflow-y-auto">
          <nav className="hidden md:flex md:flex-col">
            <NavLink to="/dashboard/grammarcheck" className={({ isActive }) =>
                `py-3 px-5 border-b border-black font-semibold transition-colors ${
                  isActive ? "bg-[#efbd18]" : "bg-[#ebebeb] hover:bg-[#dcdcdc]"
                }`}>
              AI sửa ngữ pháp
            </NavLink>

            <NavLink to="/dashboard/meeting" className={({ isActive }) =>
                `py-3 px-5 border-b border-black font-semibold transition-colors ${
                  isActive ? "bg-[#efbd18]" : "bg-white hover:bg-[#dcdcdc]"
                }`}>
              Book 1-1 meeting với mentor
            </NavLink>

            <NavLink to="/dashboard/submitted" className={({ isActive }) =>
                `py-3 px-5 border-b border-black font-semibold transition-colors ${
                  isActive ? "bg-[#efbd18]" : "bg-white hover:bg-[#dcdcdc]"
                }`}>
              Lịch đã đặt
            </NavLink>

          </nav>

          <div className="border-t border-black hidden md:flex md:flex-col text-left gap-1">
            <NavLink to="/dashboard/user-info" className={({ isActive }) =>
                `block w-full text-left py-2 px-5 border-black font-semibold transition-colors ${
                  isActive ? "bg-[#efbd18]" : "hover:bg-[#dcdcdc]"
            }`}>
              {`Tài khoản (${userName})`} <br></br> <span className="text-sm italic">{`${userEmail}`}</span>
            </NavLink>

            <Confirm
              buttonClass="block text-left w-full py-2 bg-[#efbd18] px-5 font-semibold hover:bg-[#d4a915] transition-colors"
              text="Đăng xuất"
              setUser={setUser}
            />
          </div>
        </aside>

        {open && (
          <div className="fixed top-[79px] left-0 w-full h-[calc(100vh-79px)] z-30 bg-black animate-slideDown md:hidden">
            <nav className="flex flex-col h-full text-left text-white px-8 gap-4 py-6">
              <NavLink to="/dashboard/grammarcheck" className={({ isActive }) => isActive
                    ? " border-[rgb(5,247,202)] text-[#faca0b] text-2xl"
                    : "hover:text-[#faca0b] text-2xl"
                }
                onClick={() => setOpen(false)}
              >
                AI sửa ngữ pháp
              </NavLink>
              <NavLink to="/dashboard/meeting" className={({ isActive }) => isActive
                    ? " border-[rgb(5,247,202)] text-[#faca0b] text-2xl"
                    : "hover:text-[#faca0b] text-2xl"
                }
                onClick={() => setOpen(false)}
              >
                Book 1-1 meeting với mentor
              </NavLink>
              <NavLink to="/dashboard/submitted" className={({ isActive }) => isActive
                    ? " border-[rgb(5,247,202)] text-[#faca0b] text-2xl"
                    : "hover:text-[#faca0b] text-2xl"
                }
                onClick={() => setOpen(false)}
              >
                Lịch đã đặt
              </NavLink>
              <NavLink to="/dashboard/user-info" className="px-4 py-2 bg-white text-[#16456a] rounded-lg hover:bg-[#faca0b] 
                hover:text-white transition font-semibold shadow-sm w-fit"
                onClick={() => setOpen(false)}
              >
                {`Tài khoản (${userName})`}
                <br />
                <span className="text-sm italic">{userEmail}</span>
              </NavLink>

              <Confirm buttonClass="px-4 py-2 mt-1 bg-[#efbd18] text-[#16456a] rounded-lg hover:bg-[#d4a915] transition font-semibold shadow-sm"
                text="Đăng xuất"
                setUser={setUser}
              />
            </nav>
          </div>
        )}

        {/* Content Area */}
        <main className="w-[100%] md:w-[80%] p-6 overflow-y-auto">
          <div className="p-6 rounded-md min-h-full">
            <Outlet></Outlet>  
            {location.pathname === "/dashboard" && (
              <div className="text-center mt-5 text-2xl font-semibold text-[#16456a]">
                Chào mừng <span className="font-bold text-3xl text-[#d4a915]">{`${userName}`}</span> đến với UniProof 😎
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;