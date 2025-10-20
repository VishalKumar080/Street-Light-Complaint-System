import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetUserData, setUserData } from "../services/store";
import Navigation from "../components/Navigation";

export default function Login() {
  const [username, setUsername] = useState("");
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
          "https://street-light-complaint-system.onrender.com/api/v1/users/login",
          {
            username,
            password,
          }
        )
        .then((response) => {
          alert("Login Successful");
          dispatch(setUserData(response.data.data.user));
          sessionStorage.setItem("user", JSON.stringify(response.data.data));
          navigate("/complaint");
        });
      // console.log("Login successful", response.data);

      // console.log("final data : ",response.data.data);
    } catch (error) {
      alert("Error", error);
      console.error("Error logging in:", error);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <Navigation text="Login" />

      <main className="">
        <form className="flex flex-col items-center  gap-4 mx-10 sm:mx-20">
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="username">Enter Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="p-2 border-b-2 w-auto bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="password">Enter Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border-b-2 w-auto bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-8 mt-10 align-middle">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-red-500 border-2 text-black  border-black p-2 px-4 rounded-lg hover:bg-red-300 hover:border-black transition-all duration-500 hover:scale-105"
            >
              Login
            </button>
            <Link
              className="text-white hover:text-blue-200 font-semibold transition-all duration-500 ease-in-out hover:scale-110"
              to="/register"
            >
              New User?
            </Link>
            <Link
              className="text-white border p-2 rounded-lg hover:bg-blue-900 hover:text-white font-semibold transition-all duration-500 ease-in-out"
              to="/admin/login"
            >
              Admin Login
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
