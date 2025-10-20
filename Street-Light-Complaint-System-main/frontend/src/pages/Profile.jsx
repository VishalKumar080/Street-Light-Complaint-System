import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        if (user.user?.email) {
          setIsAdmin(true);
        }
        setUserData(user.user);
      }
    };

    fetchUser();
  }, []);

  console.log("userdata", userData);

  return (
    <div>
      <Navigation text="Profile" />

      <main className="h-[90vh]">
        <div className="flex flex-col items-start px-10 gap-4 mt-10">
          <div className="text-lg bg-gray-500/25 py-4 rounded-xl flex flex-col items-center gap-4 w-full h-full">
            <ul className="gap-4 flex flex-col items-start overflow-auto">
              <li className="gap-4 flex flex-row ">
                <b>Name :</b>
                {userData.name}
              </li>
              {isAdmin ? (
                <li className="gap-4 flex flex-row ">
                  <b>Email :</b> {userData.email}
                </li>
              ) : (
                <li className="gap-4 flex flex-row ">
                  <b>Username:</b> {userData.username}
                </li>
              )}
              <li className="gap-4 flex flex-row ">
                <span className="font-bold">PhoneNo. : </span>
                <span className="">{userData.phoneNo}</span>
              </li>
              {isAdmin && (
                <>
                  <li className="gap-4 flex flex-row text-red-200 font-semibold py-4 w-full justify-center">
                    Assigned to :-
                  </li>
                  <li className="gap-4 flex flex-row ">
                    <b>Area :</b>
                    {userData.area}
                  </li>
                  <li className="gap-4 flex flex-row ">
                    <b>Centre :</b>
                    {userData.centre}
                  </li>{" "}
                  <li className="gap-4 flex flex-row ">
                    <b>Division :</b>
                    {userData.division}
                  </li>{" "}
                  <li className="gap-4 flex flex-row ">
                    <b>Centre No. :</b>
                    {userData.centrePhone}
                  </li>{" "}
                </>
              )}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-8 mt-10 align-middle">
            <button
              type="submit"
              onClick={() => {
                sessionStorage.removeItem("user");
                navigate("/login");
              }}
              className="bg-red-600/80 border-2 border-red-500 p-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-500"
            >
              Logout
            </button>
            <Link
              className="text-white hover:text-blue-200 font-semibold"
              to={`${isAdmin ? "/admin/complaint" : "/complaint"}`}
            >
              Back to complaint page?
            </Link>
            {isAdmin && (
              <Link
                className="text-white hover:text-blue-200 font-semibold"
                to="/admin/register"
              >
                Register new Admin!
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
