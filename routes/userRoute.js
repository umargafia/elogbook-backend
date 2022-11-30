import express from "express";
import {
  handleNewUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
const userRoute = express.Router();

// get/login elcom
userRoute.route("/").post(login);

userRoute.route("/allusers").get(requireAuth, getUsers);

// registering elcom
userRoute.route("/register").post(handleNewUser);

// modifying/deleting elcom
userRoute
  .route("/:id")
  .put(requireAuth, updateUser)
  .delete(requireAuth, deleteUser);

export default userRoute;
