import jsonWebToken from "jsonwebtoken";
const { verify } = jsonWebToken;
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel.js";
import { StudentModel } from "../models/studentModel.js";
export const requireAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify the token
      const decoded = verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json("Not authorized or token expires");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
});

//Student auth
export const requireStudentAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify the token
      const decoded = verify(token, process.env.JWT_SECRET);

      req.user = await StudentModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json("Not authorized or token expires");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
});
