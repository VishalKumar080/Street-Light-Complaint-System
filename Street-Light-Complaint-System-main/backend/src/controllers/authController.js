import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.js";

const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
// frontend optimisation

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Please provide username and password");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }
  const isMatch = await user.checkPassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");
  req.user = loggedInUser;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res
    .status(200)
    .cookie("token", token, { httpOnly: true, secure: true })
    .json(
      new ApiResponse(true, { token, user: loggedInUser }, "Login successful!")
    );
});

const register = asyncHandler(async (req, res) => {
  const { name, username, password, phoneNo } = req.body;
  if (!name || !username || !password || !phoneNo) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  console.log('body: ', req.body);
  
  const user = await User.findOne({ username });
  if (user) {
    throw new ApiError(400, "Username already exists");
  }

  if(phoneNo.match(phoneRegex) === null){
    throw new ApiError(400, "Invalid phone number")
  }

  const newUser = await User.create({
    name,
    username,
    password,
    phoneNo,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const loggedInUser = await User.findById(newUser._id).select("-password");
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

  const user = await User.findById(decodedToken.id).select("-password");

  return res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
});

export { login, register, logout, profile };
