import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import axios from "axios";
import ComplaintImages from "../components/ComplaintImages";

const ComplaintDetails = () => {
  const { isAdmin, complaintId } = useParams();

  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({});
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get("https://street-light-complaint-system.onrender.com/api/v1/complaints/" + complaintId);
        setComplaint(response.data.data);
      } catch (error) {}
    };

    fetchComplaint();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("https://street-light-complaint-system.onrender.com/api/v1/complaints/" + complaintId, {
        status,
        remarks,
      });
      console.log("response", response);

      navigate("/admin/complaint");
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("complaint", complaint);

  return (
    <div>
      <Navigation text={"Complaint"} />
      <main className="h-[90vh] overflow-y-auto flex flex-col items-center gap-2">
        <h1 className="text-3xl mb-5 font-semibold">Complaint Details</h1>
        <div className="flex flex-col items-center w-full gap-4">
          <div className="p-4 rounded-md w-[400px] gap-2 px-12 flex flex-col items-start ">
            <h1 className="text-xl font-semibold">
              <b>Fault :</b> {complaint.typeOfFault}
            </h1>
            <p className="">
              {" "}
              <b>Category :</b> {complaint.category}
            </p>
            <p className="font-semibold">
              {" "}
              <b>Location :</b> {complaint.location}
            </p>
            <p className="tracking-tight">
              {" "}
              <b>Remarks :</b> {complaint.remarks}
            </p>
            <p className="">
              {" "}
              <b>Date :</b> {complaint.createdAt?.split("T")[0]}
            </p>
            <p className="">
              <b>Time :</b> {complaint.createdAt?.split("T")[1]?.split(".")[0]}{" "}
              ISD
            </p>
            <div className="p-2 px-16 font-bold text-lg">Customer Details</div>
            <p>
              <b>Name :</b> {complaint.callerName}
            </p>
            <p>
              <b>Address :</b> {complaint.callerAddress}
            </p>
            <p>
              <b>Phone :</b> {complaint.callerPhone}
            </p>
          </div>
        </div>
        <ComplaintImages complaint={complaint} />
        <div className="mb-10"></div>

        {complaint.status === "pending" && isAdmin === "admin" && (
          <div className="flex flex-col items-center bg-white/10 gap-4 rounded-md p-4 my-8">
            <h1 className="text-xl font-semibold ">Actions</h1>
            <select
              name="status"
              id="status"
              value={status}
              className="p-2 border-b-2 bg-transparent border-gray-500 text-lg"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option className="bg-black/90" value="">
                Select the status
              </option>
              <option className="bg-black/90" value="approved">
                Approve
              </option>
              <option className="bg-black/90" value="deny">
                Deny
              </option>
            </select>
            <label htmlFor="">Remarks</label>
            <textarea
              id=""
              type="text"
              placeholder="Remarks"
              className="p-2 border-b-2 w-[250px] bg-transparent border-gray-500 text-lg"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            <button
              onClick={onSubmit}
              className="bg-red-400 text-black border border-black"
            >
              Submit
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ComplaintDetails;
