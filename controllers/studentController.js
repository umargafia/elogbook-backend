import bcrypt from "bcryptjs";
import { StudentModel } from "../models/studentModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import EmailValidator from "email-validator";

// generating token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const validateEmail = (val) => {
  return EmailValidator.validate(val);
};

// register user
export const registerStudent = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    name,
    regNo,
    year,
    department,
    course,
    company,
    supervisor,
  } = req.body;
  if (
    !email ||
    !password ||
    !name ||
    !regNo ||
    !year ||
    !department ||
    !course ||
    !company ||
    !supervisor
  )
    return res.status(400).json({ msg: "All are required" });

  // validating email
  if (validateEmail(email) === false) {
    return res.status(400).json("Invalid email");
  }

  // check if user exist in database
  const emailDuplicate = await StudentModel.findOne({ email });
  if (emailDuplicate) return res.status(409).json("User already exist");
  const regNoDuplicate = await StudentModel.findOne({ regNo });
  if (regNoDuplicate) return res.status(409).json("User already exist");

  try {
    // encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    //create and store new stundet
    const createStudent = await StudentModel.create({
      email,
      regNo,
      password: hashedPwd,
      name,
      role: "student",
      year,
      department,
      course,
      company,
      supervisor,
    });

    if (createStudent) {
      return res.status(201).json({
        _id: createStudent._id,
        name: createStudent.name,
        email: createStudent.email,
        role: createStudent.role,
        regNo: createStudent.regNo,
        year: createStudent.year,
        department: createStudent.department,
        course: createStudent.course,
        company: createStudent.company,
        supervisor: createStudent.supervisor,
        token: generateToken(createStudent._id, createStudent.role),
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// login user
export const studentLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // validating email
    if (validateEmail(email) === false) {
      return res.status(400).json("Invalid email");
    }

    // check if user exist
    const student = await StudentModel.findOne({ email });
    if (!student)
      return res
        .status(404)
        .json({ message: `student with this email: ${email} is not found` });

    //validating student password
    const validatePassword = await bcrypt.compare(password, student.password);

    //log student in
    if (validatePassword) {
      return res.status(200).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        regNo: student.regNo,
        year: student.year,
        department: student.department,
        course: student.course,
        company: student.company,
        supervisor: student.supervisor,
        token: generateToken(student._id, student.role),
      });
    } else {
      return res.status(409).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

//get all students
// export const getStudents = asyncHandler(async (req, res) => {
//   const students = await StudentModel.find();
//   res.status(200).json({ students });
// });

// //update user
// export const updateUser = asyncHandler(async (req, res) => {
//   const id = req.params.id;
//   // const user = await Studnet.indById(id);
//   const { email, password, name, role } = req.body;

//   if (!email || !password || !name || !role)
//     return res.status(400).json({ message: "All are required" });

//   // validating email
//   if (validateEmail(email) === false) {
//     return res.status(400).json("Invalid email");
//   }

//   if (!req.user) {
//     res.status(404).json({ message: "User not found" });
//   }

//   if (req.user._id.toString() !== id && req.user.role !== "admin") {
//     return res.status(401).json("User not authorized");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hashedPwd = await bcrypt.hash(password, salt);

//   const update = await StudentModel.findByIdAndUpdate(
//     id,
//     { email, name, password: hashedPwd },
//     {
//       new: true,
//     }
//   );
//   // const users = await Studnet.ind();

//   res
//     .status(200)
//     .json({ _id: update._id, email: update.email, name: update.name });
//   // res.status(200).json({ _id: update._id, email: user.email, name: user.name });
// });

// // //delete user
// export const deleteUser = asyncHandler(async (req, res) => {
//   const id = req.params.id;

//   if (req.user._id.toString() !== id && req.user.role !== "admin") {
//     return res.status(401).json("User not authorized");
//   }

//   if (!req.user) {
//     res.status(404).json("User not found");
//   }
//   await req.user.remove();
//   // const users = await Studnet.ind();
//   res
//     .status(200)
//     .json(`User with ${req.user.email} has been deleted successfully`);
// });
