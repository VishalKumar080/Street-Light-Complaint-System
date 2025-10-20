import express from "express";

const router = express.Router();

import {
  createComplaint,
  getComplaints,
  getAllComplaints,
  allAreas,
  getCenter,
  getDivision,
  getComplaintWithId,
  getAdminComplaints,
  putComplaintWithId,
} from "../controllers/complaintController.js";

router.post("/create", createComplaint);

router.get("/user/:username", getComplaints);

router.get("/admin", getAdminComplaints);

router.get("/", getAllComplaints);

router.get("/:complaintId", getComplaintWithId);
router.put("/:complaintId", putComplaintWithId);

router.get("/allarea/:area", allAreas);

router.get("/center/:area", getCenter);

router.get("/division/:center", getDivision);



export default router;
