import axios from "axios";
import React, { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setUserData } from "../services/store";
import Navigation from "../components/Navigation";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [area, setArea] = useState("");
  const [centre, setCentre] = useState("");
  const [division, setDivision] = useState("");
  const [centrePhone, setCentrePhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://street-light-complaint-system.onrender.com/api/v1/admin/register",
        {
          name,
          email,
          password,
          phoneNo,
          area,
          centre,
          division,
          centrePhone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Registration Successful");
      //   console.log("response", response);

      dispatch(setUserData(response.data.data.user));
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/admin/complaint");
      //   console.log("Registration successful", response.data);
    } catch (error) {
      alert("Fill all fields");
      console.log("error", error);
    }
  };

  return (
    <>
      <Navigation text="Admin Register" />

      <main className="mx-2 overflow-y-scroll h-[90vh]">
        <form
          className="flex flex-col items-center gap-4 mx-10 sm:mx-20 overflow-y-scroll no-scrollbar"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="name">Enter Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 border-b-2 w-full  bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="phoneNo">Enter Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Phone Number"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="area">Enter Area</label>
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="centre">Enter Centre</label>
            <input
              type="text"
              id="centre"
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              placeholder="Centre"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="division">Enter Division</label>
            <input
              type="text"
              id="division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              placeholder="Division"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="centrePhone">Enter Centre Phone Number</label>
            <input
              type="text"
              id="centrePhone"
              value={centrePhone}
              onChange={(e) => setCentrePhone(e.target.value)}
              placeholder="Centre Phone Number"
              className="p-2 border-b-2 w-full bg-transparent border-gray-500"
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full  gap-4 mt-10 pr-20">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-transparent border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Sign Up
            </button>
            <Link
              className="text-white hover:text-blue-200 font-thin"
              to="/admin/login"
            >
              Admin Login
            </Link>
          </div>
        </form>
      </main>
    </>
  );
};

export default AdminRegister;
