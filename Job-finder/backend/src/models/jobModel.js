import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Companies" },
    JobTitle: {
      type: String,
      required: [true, "Job Title is required"],
    },
    JobType: { type: String, required: [true, "Job Types is required"] },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
    },
    vacancies: {
      type: Number,
    },
    experiences: {
      type: Number,
      default: 0,
    },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", JobSchema);

export default Jobs;
