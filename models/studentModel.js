import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  regNo: {
    type: String,
    lowercase: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "student",
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
    lowercase: true,
  },
  course: {
    type: String,
    required: true,
    lowercase: true,
  },
  company: {
    type: String,
    required: true,
    lowercase: true,
  },
  supervisor: {
    type: String,
    required: true,
    lowercase: true,
  },
});

export const StudentModel = mongoose.model("Student", StudentSchema);
