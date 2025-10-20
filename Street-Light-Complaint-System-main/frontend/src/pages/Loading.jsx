import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

function Loading() {
  const navigate = useNavigate();
  setTimeout(() => {
    console.log("Redirecting to login");
    navigate("/login");
  }, 2000);
  return (
    <>
      <Navigation text="Street Light Complaint" />
      <main className="flex items-center justify-center h-[90vh]">
        <div className="text-3xl font-bold text-center">
          <img
            src="/assets/slcs_logo.png"
            className="rounded-full"
            alt="logo"
          />
        </div>
      </main>
    </>
  );
}

export default Loading;
