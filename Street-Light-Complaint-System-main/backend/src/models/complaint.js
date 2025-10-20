import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    alternatePhone: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    },
    callerAddress: {
      type: String,
      required: true,
    },
    callerName: {
      type: String,
      required: true,
    },
    callerPhone: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    complainCentre: {
      type: String,
      required: true,
    },
    complainCentrePhone: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    picture: {
      type: String,
    //   required: true,
    },
    remarks: {
      type: String,
    },
    signature: {
      type: String,
    //   required: true,
    },
    typeOfFault: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    approvedBy: {
      type: String,
    },
    approverRemarks: {
      type: String,
    },
    username: {
      type: String,
    },
}, { timestamps: true });

export const Complaint = mongoose.model("Complaint", complaintSchema);