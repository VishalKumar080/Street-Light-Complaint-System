import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// handle cors
app.use(cors())

import authRoute from "./routes/authRoute.js";
import complaintRoute from "./routes/complaintRoute.js";
import adminRoute from "./routes/adminRoute.js";

app.get("/", (req, res) => {return res.send("Welcome to the Complaint Management System")});
app.use("/api/v1/users", authRoute);
app.use("/api/v1/complaints", complaintRoute);
app.use("/api/v1/admin", adminRoute);

export { app };
