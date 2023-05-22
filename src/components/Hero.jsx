import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero({ show, id }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="w-full md:h-[70vh] sm:h-[50vh] re"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl md:text-4xl text-white font-bold text-center ">
          Unlock your potential, Find your dream Job
        </h1>
      </div>
      {show && (
        <button
          onClick={() => navigate("/apply/" + id)}
          className="absolute top-[50%] hover:bg-black hover:animate-pulse hover:transition-all bg-red-600 px-6 py-2 rounded-sm text-white right-5 md:right-32"
        >
          Apply Now
        </button>
      )}
    </div>
  );
}
