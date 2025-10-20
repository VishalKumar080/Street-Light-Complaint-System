import React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const NavWithProfile = ({ text }) => {
  return (
    <header className="sticky text-center left-0 top-0 w-full z-10 bg-red-500 font-bold text-white text-3xl p-2 mb-10 flex justify-center items-center">
      <span className="">{text}</span>
      <Link
        to="/profile"
        className="absolute right-4 flex items-center text-white hover:text-white group"
      >
        <img
          src="/assets/profile-image.jpg"
          alt="profile"
          className="w-10 h-10 rounded-full group-hover:scale-105 transition-all duration-300 ease-in-out"
        />
        <ChevronDown className="group-hover:-rotate-90 transition-all duration-300 ease-in-out" />
      </Link>
    </header>
  );
};

export default NavWithProfile;
