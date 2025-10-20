import React from "react";
import { Link } from "react-router-dom";

const ComplaintCard = ({ complaint, type }, {key}) => {
  // console.log('isAdmin: ', type);
  
  return (
    <Link
      key={key}
      to={`/complaint/${type}/${complaint._id}`}
      className={`flex flex-col items-start sm:w-[400px] min-w-[350px] h-[200px] gap-1 text-white hover:scale-105 p-4 rounded-xl ${
        complaint.status === "pending" && "bg-zinc-400/35"
      } ${complaint.status === "deny" && "bg-red-400/35"} ${
        complaint.status === "approved" && "bg-green-400/35"
      } transition-all hover:text-white/80 `}
    >
      <h2 className="text-xl">
        <b>Category : </b>
        {complaint.category}
      </h2>
      <p className="text-lg">Faults : {complaint.typeOfFault}</p>
      <p className="text-base">Location : {complaint.location}</p>
      <p className="text-base capitalize text-yellow-200">
        Status : {complaint.status}
      </p>
      <p className="text-base text-blue-400 font-semibold">
        By: {complaint.callerName}
      </p>
      <p className="text-sm justify-end flex w-full">
        Date : {complaint.createdAt.split("T")[0]}
      </p>
    </Link>
  );
};

export default ComplaintCard;
