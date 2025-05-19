import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

function Navbar() {
  const { user, handleLogOut } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const navbar = [
    { title: "Home", link: "/" },
    { title: "Assignments", link: "/assignments" },
  ];

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav className="py-4 px-6 bg-gray-800 text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold text-yellow-400">
          <span className="text-3xl">📚</span>
          <Link to={`/`}>
            {" "}
            <span className="text-3xl font-lobster ml-2">StudyHive</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            {navbar.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className={({ isActive }) =>
                  `py-2 px-4 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}

            {user ? (
              <div className="relative flex items-center gap-4">
                {/* User Dropdown */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL}
                    alt="User Profile"
                    className="h-10 w-10 rounded-full hover:border-2 hover:border-yellow-200"
                  />
                  {dropdownOpen && (
                    <ul className="absolute top-12 right-0 bg-gray-800 text-yellow-200 shadow-lg py-2 px-3 w-44 rounded-lg z-10">
                      <li>
                        <NavLink
                          to="/pending-assignments"
                          className="block py-2 px-3 hover:bg-gray-700 rounded"
                          onClick={() =>
                            setActiveButton("/pending-assignments")
                          }
                        >
                          Pending Assignments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/create-assignments"
                          className="block py-2 px-3 hover:bg-gray-700 rounded"
                          onClick={() => setActiveButton("/create-assignments")}
                        >
                          Create Assignments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/attempted-assignments"
                          className="block py-2 px-3 hover:bg-gray-700 rounded"
                          onClick={() =>
                            setActiveButton("/attempted-assignments")
                          }
                        >
                          My Attempted Assignments
                        </NavLink>
                      </li>
                    </ul>
                  )}
                  <FaCaretDown className="absolute right-3 -bottom-1 text-yellow-400" />
                </div>
                <button
                  onClick={handleLogOut}
                  className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={`py-2 px-4 rounded-full transition-all duration-300 ${
                  activeButton === "/login"
                    ? "bg-yellow-600 text-white shadow-lg"
                    : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                }`}
                onClick={() => setActiveButton("/login")}
              >
                Login
              </NavLink>
            )}
          </div>
          {/* dark toggle btn */}

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onChange={handleToggle}
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-yellow-400"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            className="fixed top-0 left-0 h-full w-4/5 bg-gray-900 text-white z-50 shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            <div className="p-6 flex flex-col gap-4">
              {navbar.map((item, index) => (
                <NavLink
                  to={item.link}
                  key={index}
                  className={({ isActive }) =>
                    `py-2 px-4 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              ))}

              {user ? (
                <>
                  <NavLink
                    to="/pending-assignments"
                    className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                      activeButton === "/pending-assignments"
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveButton("/pending-assignments");
                      setToggle(false);
                    }}
                  >
                    Pending Assignments
                  </NavLink>
                  <NavLink
                    to="/create-assignments"
                    className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                      activeButton === "/create-assignments"
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveButton("/create-assignments");
                      setToggle(false);
                    }}
                  >
                    Create Assignments
                  </NavLink>
                  <NavLink
                    to="/attempted-assignments"
                    className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                      activeButton === "/attempted-assignments"
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    }`}
                    onClick={() => {
                      setActiveButton("/attempted-assignments");
                      setToggle(false);
                    }}
                  >
                    My Attempted Assignments
                  </NavLink>
                  <button
                    onClick={handleLogOut}
                    className="py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={`block py-2 px-4 rounded-full transition-all duration-300 ${
                    activeButton === "/login"
                      ? "bg-yellow-600 text-white shadow-lg"
                      : "hover:bg-yellow-600 hover:text-white"
                  }`}
                  onClick={() => {
                    setActiveButton("/login");
                    setToggle(false);
                  }}
                >
                  Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
