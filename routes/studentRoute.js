import express from "express";
import { requireStudentAuth } from "../middleware/authMiddleware.js";
import {
    registerStudent, studentLogin,
} from "../controllers/studentController.js";

const studentRoute = express.Router();

// get/login elcom
studentRoute.route("/login").post(studentLogin);

// studentRoute.route("/allStudents").get(requireStudentAuth, getStudents);
// registering elcom
studentRoute.route("/register").post(registerStudent);

// modifying/deleting elcom
// studentRoute
//   .route("/:id")
//   .put(requireStudentAuth, updateStudent)
//   .delete(requireStudentAuth, deleteStudent);

export default studentRoute;
