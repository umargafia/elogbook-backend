import express from "express";
import {
  handleNewUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
  getMe,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
const userRoute = express.Router();

// get/login elcom
userRoute.route("/").get(requireAuth, getMe).post(login);

userRoute.route("/allusers").get(requireAuth, getUsers);

// registering elcom
userRoute.route("/register").post(handleNewUser);

// modifying/deleting elcom
userRoute
  .route("/:id")
  .put(requireAuth, updateUser)
  .delete(requireAuth, deleteUser);

export default userRoute;
