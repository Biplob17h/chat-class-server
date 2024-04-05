import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "name is too short"],
    maxLength: [50, "name is too large"],
    trim: true,
    required: [true, "please provide a name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "please provide a email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  photo: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("users", userSchema);

export default User;
