import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, setUserData } from "../services/store";
import Navigation from "../components/Navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = JSON.parse(sessionStorage.getItem("user"));
  // console.log('token', token);

  useEffect(() => {
    if (token) {
      const logout = window.confirm("Are you sure you want to logout?");

      if (logout) {
        sessionStorage.removeItem("user");
        dispatch(resetUserData());
      } else {
        navigate("/complaint");
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "https://street-light-complaint-system.onrender.com/api/v1/admin/login",
          {
            email,
            password,
          }
        )
        .then((response) => {
          alert("Login Successful");
          dispatch(setUserData(response.data.data.user));
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
          navigate("/admin/complaint");
        });
      // console.log("Login successful", response.data);

      // console.log("final data : ",response.data.data);
    } catch (error) {
      alert("Error", error);
      console.error("Error logging in:", error);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <Navigation text="Admin Login" />

      <main className="">
        <form className="flex flex-col items-center gap-4 mx-10 sm:mx-20">
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="email">Enter Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="password">Enter Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-8 mt-10 align-middle pr-16">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-red-500 border-2 text-black  border-black p-2 px-4 rounded-lg hover:bg-red-300 hover:border-black transition-all duration-500 hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AdminLogin;
