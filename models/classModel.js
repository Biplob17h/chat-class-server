import mongoose from "mongoose";

const classSchema = mongoose.Schema({
  classTitle: {
    type: String,
    trim: true,
    maxLength: [20, "class title is too large"],
    required: [true, "class title is required"],
  },
  classDesc: {
    type: String,
    required: [true, "class description is required"],
  },
  classTeacher: {
    type: String,
    required: [true, "class teacher email is required"],
  },
  coTeacher: {
    type: String,
    default: "",
  },
  homework: {
    type: Array,
    default: [],
  },
  students: {
    type: Array,
    default: [],
  },
  classPassword: {
    type: String,
  },
});

const Class = mongoose.model("class", classSchema);

export default Class;
