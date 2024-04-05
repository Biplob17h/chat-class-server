import mongoose from "mongoose";

const AssignmentSubmitSchema = mongoose.Schema({
  studentName: {
    type: String,
  },
  studentEmail: {
    type: String,
  },
  studentPhoto: {
    type: String,
  },
  assignmentLink: {
    type: String,
  },
  assignmentSubmitDesc: {
    type: String,
  },
  assignmentSubmitTitle: {
    type: String,
  },
  assignmentResult: {
    type: Object,
    default: "",
  },
});

const AssignmentSubmit = mongoose.model("Assignments", AssignmentSubmitSchema);

export default AssignmentSubmit;
