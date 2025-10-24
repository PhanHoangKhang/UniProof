import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import SignInModal from "../SignIn/SignInModal";
import Confirm from "../SignIn/Confirm";
import { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  //  Check if user is logged in (on mount)
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleClose = () => {
    const menu = document.querySelector(".animate-slideDown");
    if (menu) {
      menu.classList.replace("animate-slideDown", "animate-slideUp");
      setTimeout(() => setOpen(false), 400);
    }
  };
  // Log out handler
  return (
    <>
      <div className="fixed z-10 top-0 left-0 w-full bg-[#16456a] text-white flex justify-between  
          items-center py-5 px-10 border-b border-[rgb(5,247,202)] shadow-md">
        {/* Logo */}
        <a href="/" className="flex flex-row justify-center items-center gap-5 font-bold text-2xl">
          <img src={logo} width="50" height="50" alt="logo" />
          <span>
            Uni<span className="text-[#efbd18]">Proof</span>
          </span>
        </a>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <a href="/" className={({ isActive }) => isActive
                ? "pb-1 border-b-2 border-[rgb(5,247,202)] hover:text-[rgb(5,247,202)] text-lg"
                : "hover:text-[rgb(5,247,202)] text-lg"
          }>
            Trang chủ
          </a>
          <a href="#services" className={({ isActive }) => isActive
                ? "pb-1 border-b-2 border-[rgb(5,247,202)] hover:text-[rgb(5,247,202)] text-lg"
                : "hover:text-[rgb(5,247,202)] text-lg"
          }>
            Dịch vụ
          </a>
          <a href="#testimonials" className={({ isActive }) =>
              isActive
                ? "pb-1 border-b-2 border-[rgb(5,247,202)] hover:text-[rgb(5,247,202)] text-lg"
                : "hover:text-[rgb(5,247,202)] text-lg"
          }>
            Hỗ trợ
          </a>
        </nav>
        {/*  Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            // If not logged in
            <SignInModal text="Đăng nhập" buttonClass="z-0 px-4 py-2 bg-white border-none text-[#16456a] rounded-lg 
              hover:bg-[rgb(5,247,202)] hover:text-white transition font-semibold shadow-sm sm:hidden md:block"
            /> ) : (
            // If logged in
            <>
              <button
                onClick={() => navigate("/dashboard/user-info")}
                className="px-4 py-2 bg-white text-[#16456a] rounded-lg hover:bg-[#faca0b] hover:text-white transition font-semibold shadow-sm"
              >
                Tài khoản
              </button>

              <Confirm buttonClass="px-4 py-2 bg-[#efbd18] text-[#16456a] rounded-lg hover:bg-[#d4a915] transition font-semibold 
              shadow-sm" text="Đăng xuất" setUser={setUser}></Confirm>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
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
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="fixed top-[91px] h-[calc(100vh-91px)] w-full z-10 animate-slideDown">
          <nav className="flex flex-col h-full text-left bg-[black] text-white gap-3 px-8 py-6 md:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "pb-1 hover:text-[#faca0b] text-[#faca0b] text-2xl font-semibold"
                  : "hover:text-[#faca0b] text-2xl font-semibold"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                isActive
                  ? "pb-1 hover:text-[#faca0b] text-[#faca0b] text-2xl font-semibold"
                  : "hover:text-[#faca0b] text-2xl font-semibold"
              }
            >
              Dịch vụ
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "pb-1 hover:text-[#faca0b] text-2xl text-[#faca0b] font-semibold"
                  : "hover:text-[#faca0b] text-2xl font-semibold"
              }
            >
              Hỗ trợ
            </NavLink>

            {/* Mobile login/logout */}
            {!user ? (
              <SignInModal
                text="Đăng nhập"
                buttonClass="z-100 px-4 py-2 bg-white border-none text-[#16456a] rounded-lg hover:bg-[#faca0b] 
                hover:text-white transition font-semibold shadow-sm text-xl"
              />
            ) : (
              <>
              <button
                onClick={() => navigate("/dashboard/user-info")}
                className="px-4 py-2 bg-white text-[#16456a] rounded-lg hover:bg-[#faca0b]
                 hover:text-white transition font-semibold shadow-sm w-fit mt-4 text-xl"
              >
                👤 Tài khoản
              </button>

              <Confirm
                buttonClass="px-4 py-2 bg-[#efbd18] text-[#16456a] rounded-lg hover:bg-[#d4a915] 
              transition font-semibold shadow-sm text-xl"
                text="🚪 Đăng xuất"
                setUser={setUser}
              ></Confirm>
            </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
