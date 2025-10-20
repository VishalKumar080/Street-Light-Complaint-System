import { Admin } from "../models/admin.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log('body: ', req.body);
  
  if (!email || !password) {
    throw new ApiError(400, "Please provide username and password");
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const loggedInUser = await Admin.findById(user._id).select("-password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(
      new ApiResponse(
        true,
        { token, user: loggedInUser },
        "Admin login successful!"
      )
    );
});

const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNo,
    area,
    centre,
    division,
    centrePhone,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phoneNo ||
    !area ||
    !centre ||
    !division ||
    !centrePhone
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  console.log("body: ", req.body);

  const user = await Admin.findOne({ email });
  if (user) {
    throw new ApiError(400, "Username already exists");
  }

  const newUser = await Admin.create({
    name,
    email,
    password,
    phoneNo,
    area,
    centre,
    division,
    centrePhone,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  const loggedInUser = await Admin.findById(newUser._id).select("-password");
  req.user = loggedInUser;

  return res
    .status(201)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(
      new ApiResponse(
        true,
        { token, user: loggedInUser },
        "Registration successful!"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true, secure: true })
      .json(new ApiResponse(true, {}, "Logout successful!"));
  } catch (err) {
    throw new ApiError(500, "Logout failed");
  }
});

const profile = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json(new ApiResponse(false, {}, "Please login to access this route"));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await Admin.findById(decodedToken.id).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
})

export { login, register, logout, profile };