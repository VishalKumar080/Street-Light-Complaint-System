import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Complaint } from "../models/complaint.js";
import { Admin } from "../models/admin.js";

const createComplaint = asyncHandler(async (req, res) => {
  const {
    alternatePhone,
    area,
    callerAddress,
    callerName,
    callerPhone,
    category,
    complainCentre,
    complainCentrePhone,
    division,
    location,
    remarks,
    typeOfFault,
    picture,
    signature,
    username,
  } = req.body;
  console.log("req.body", req.body);

  if (
    !alternatePhone ||
    !area ||
    !callerAddress ||
    !callerName ||
    !callerPhone ||
    !category ||
    !complainCentre ||
    !complainCentrePhone ||
    !division ||
    !location ||
    !remarks ||
    !typeOfFault
  ) {
    return new ApiError(400, "Please provide all the required fields");
  }

  try {
    const newComplaint = await Complaint.create({
      alternatePhone,
      area,
      callerAddress,
      callerName,
      callerPhone,
      category,
      complainCentre,
      complainCentrePhone,
      division,
      location,
      remarks,
      typeOfFault,
      picture,
      signature,
      username,
    });
    return res
      .status(201)
      .json(
        new ApiResponse(true, newComplaint, "Complaint created successfully!")
      );
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(500, "Error creating complaint:");
  }
});

const getComplaints = asyncHandler(async (req, res) => {
  const username = req?.params?.username;
  // console.log("username", username);

  const complaints = await Complaint.find({ username }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(true, complaints));
});

const getAllComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({}).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, complaints));
});

const getAdminComplaints = asyncHandler(async (req, res) => {
  const { area, centre, division } = req.query;
  
  if (!area || !centre || !division) {
    return new ApiError(400, "Please provide all the required fields");
  }

  const complaints = await Complaint.find({
    area,
    complainCentre: centre,
    division,
  }).sort({ createdAt: -1 });
  if (!complaints) {
    throw new ApiError(404, "Complaints not found!");
  }
  return res.status(200).json(new ApiResponse(200, complaints, "Complaints found!"));
})

const getComplaintWithId = asyncHandler(async (req, res) => {
  const { complaintId } = req.params;
  
  const complaint = await Complaint.findById(complaintId);
  
  if (!complaint) {
    throw new ApiError(404, "Complaint not found!");
  }
  return res.status(200).json(new ApiResponse(200, complaint));

});

const putComplaintWithId = asyncHandler(async (req, res) => {
  const { complaintId } = req.params;
  const { status, remarks } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(complaintId, {
    status,
    remarks,
  }, { new: true });
  if (!complaint) {
    throw new ApiError(404, "Complaint not found!");
  }
  return res.status(200).json(new ApiResponse(200, complaint, "Complaint updated!"));
})


const allAreas = asyncHandler(async (req, res) => {
  const area = await Admin.aggregate([
    { $group: { _id: "$area", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  return res.status(200).json(new ApiResponse(200, area));
});

const getCenter = asyncHandler(async (req, res) => {
  const { area } = req.params;
  const center = await Admin.aggregate([
    { $match: { area: area } },
    { $group: { _id: "$centre", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  // console.log('center', center);
  
  return res.status(200).json(new ApiResponse(200, center));
});

const getDivision = asyncHandler(async (req, res) => {
  const { center } = req.params;
  const division = await Admin.aggregate([
    { $match: { centre: center } },
    {
      $group: {
        _id: "$division",
        centrePhone: { $first: "$centrePhone" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  
  return res.status(200).json(new ApiResponse(200, division));
});

export {
  createComplaint,
  getComplaints,
  getAllComplaints,
  getAdminComplaints,
  getComplaintWithId,
  putComplaintWithId,
  allAreas,
  getCenter,
  getDivision,
};
