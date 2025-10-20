import React from "react";

const Navigation = ({ text }) => {
  return (
    <header className="sticky left-0 top-0 w-full z-10 bg-red-500 font-bold text-center text-white text-3xl p-2 mb-10">
      <span>{text}</span>
     
    </header>
  );
};

export default Navigation;
