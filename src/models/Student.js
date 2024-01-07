import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Your name is required",
      trim: true,
      max: 25,
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("students", StudentSchema);
