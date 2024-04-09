import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userType = useSelector((state) => state.auth.userType);
  const data = useSelector((state) => state.auth.user);
  console.log("User type: ", userType);
  console.log("allData: ", data);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        userType === "user"
          ? "http://localhost:3000/users/logout"
          : "http://localhost:3000/vendors/logout"
      );

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      dispatch(logout()); // Let the action handle potential data clearing
      console.log(response.data.message);

      if (userType === "user") {
        navigate("/users/login"); // Or "/vendors/login" depending on user type
      } else {
        navigate("/vendors/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/users/login");
    }
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {isLoggedIn && (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to={userType === "user" ? "/users/home" : "/vendors/home"}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={userType === "user" ? "/users/about" : "/vendors/about"}
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link>User Reviews</Link>
                </li>
                <li>
                  <Link
                    to={
                      userType === "user"
                        ? "/users/uDashboard"
                        : "/vendors/vDashboard"
                    }
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {userType === "user" ? (
            <Link to="/users/home" className="btn btn-ghost text-xl">
              Wedding Sparks
            </Link>
          ) : (
            <Link to="/vendors/home" className="btn btn-ghost text-xl">
              Wedding Sparks
            </Link>
          )}
        </div>
        {isLoggedIn && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link
                  to={userType === "user" ? "/users/home" : "/vendors/home"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={userType === "user" ? "/users/about" : "/vendors/about"}
                >
                  About
                </Link>
              </li>

              <li>
                <a>User Reviews</a>
              </li>
              <li>
                <Link
                  to={
                    userType === "user"
                      ? "/users/uDashboard"
                      : "/vendors/vDashboard"
                  }
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        )}
        {isLoggedIn && (
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
