import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const NavBar = () => {
  const { handleLogOut, user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/assignments">Assignments</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/pending-assignments">Pending Assignments</NavLink>
          </li>
          <li>
            <details>
              <summary>
                <NavLink>Profile Picture</NavLink>
              </summary>
              <ul className="p-2">
                <li>
                  <NavLink to="/create-assignments">Create Assignments</NavLink>
                </li>
                <li>
                  <NavLink to="/attempted-assignments">
                    My Attempted Assignments
                  </NavLink>
                </li>
              </ul>
            </details>
          </li>
        </>
      )}
    </>
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <nav className="navbar bg-base-100 px-12 py-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="font-extrabold text-2xl">StudyHive</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 z-50">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            <div
              className="tooltip tooltip-bottom"
              data-tip={user?.displayName}
            >
              <img className="w-12 h-12 rounded-full" src={user?.photoURL} />
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-neutral text-white"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-neutral">
              Login
            </Link>
            <Link to="/register" className="btn btn-neutral">
              Register
            </Link>
          </>
        )}

        {/* dark mode toggle button */}

        <button
          onClick={toggleDarkMode}
          className="text-yellow-400 text-3xl ml-4 hover:text-gray-500 transition-all duration-300"
        >
          {darkMode ? <IoMdSunny /> : <IoMdMoon />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
