import React, { useState } from "react";
import { FaBars, FaEdit, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import getUserAuth from "../hooks";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const { user } = getUserAuth();

  return (
    <div className="p-3 bg-[#176b6b]">
      <nav>
        <ul className="md:flex justify-between items-center relative">
          <li>
            <Link className="text-white text-xl my-2 mb-3 md:mb-0" to={"/"}>
              Jobhive
            </Link>
          </li>
          <div className="flex items-center space-x-4 ">
            <li
              className="md:hidden absolute top-1.5 right-4"
              onClick={() => setShowNav(!showNav)}
            >
              <FaBars />
            </li>
            <div className={`${!showNav ? "hidden" : ""} md:block`}>
              <ul className=" flex flex-col  md:flex items-center md:space-x-4 md:flex-row ">
                <li className="mb-2 md:mb-0">
                  <Link className="text-white " to={"/register"}>
                    Register
                  </Link>
                </li>
                <li className="mb-2 md:mb-0">
                  <Link className="text-white " to={"/login"}>
                    Login
                  </Link>
                </li>
                {user.email && (
                  <li className="mb-2 md:mb-0">
                    <Link className=" text-white" to={"/dashboard"}>
                      Dashboard
                    </Link>
                  </li>
                )}
                {user.email && (
                  <li className="mb-2 md:mb-0">
                    <button
                      onClick={() => {
                        navigate("/new");
                      }}
                      className="p-2 bg-[#000] text-white flex  items-center gap-1 rounded "
                    >
                      Post New <FaEdit />
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <Toaster />
        </ul>
      </nav>
    </div>
  );
}
