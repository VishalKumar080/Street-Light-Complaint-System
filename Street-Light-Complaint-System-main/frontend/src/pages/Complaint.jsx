import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavWithProfile from "../components/NavWithProfile";
import ComplaintCard from "../components/ComplaintCard";

function Complaint() {
  const user = JSON.parse(sessionStorage.getItem("user")) || null;
  // console.log("user", user);
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState();

  const handleComplaint = async () => {
    try {
      const response = await axios.get(
        `https://street-light-complaint-system.onrender.com/api/v1/complaints/user/${user.user.username}`
      );
      // console.log("response", response);

      setComplaints(response.data.data);
      
    } catch (error) {
      // alert("Error", error);
      console.log("No user found", error);
    }
  };

  useEffect(() => {
    if (user) handleComplaint();
  }, []);

  return (
    <>
      <NavWithProfile text="All Complaints" />
      <main className="h-[90vh] overflow-y-scroll text-center">
        {/* file new complaint */}

        <div className="flex justify-center items-end mt-2">
          <Link to="/newComplaint" className="text-red-500 font-bold text-lg">
            File new complaint !
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4 my-10">
          {Array.isArray(complaints) &&
            complaints.map((complaint, index) => (
              <ComplaintCard complaint={complaint} key={index} type="user" />
            ))}
        </div>

        <button
          onClick={() => {
            sessionStorage.removeItem("user");
            navigate("/login");
          }}
          className="bg-red-500 mt-6 text-white px-4 py-2 rounded-md mb-10"
        >
          Logout
        </button>
      </main>
    </>
  );
}

export default Complaint;
