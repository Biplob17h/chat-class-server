import bcrypt from "bcrypt";
import ifUserExist from "../utils/ifUserExist.js";
import User from "../models/userModel.js";

const createAUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check credentials
    if (!name || !email || !password) {
      return res.json({
        status: "fail",
        message: "please provide your credentials",
      });
    }

    // if email in use
    const oldUser = await ifUserExist(email);
    if (oldUser) {
      return res.json({
        status: "fail",
        message: "email already in use",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // user data
    const userData = {
      name,
      email,
      password: passwordHash,
    };

    // send data to database
    const user = new User(userData);
    const result = await user.save();

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check credentials
    if (!email || !password) {
      return res.json({
        status: "fail",
        message: "please provide your credentials",
      });
    }

    // if email in use
    const user = await ifUserExist(email);
    if (!user) {
      return res.json({
        status: "fail",
        message: "no user found",
      });
    }

    // match password
    const hashPassword = user.password;
    const match = await bcrypt.compare(password, hashPassword);
    if (!match) {
      return res.json({
        status: "fail",
        message: "wrong password",
      });
    }

    const userData = await User.findOne({ email }).select("-password");

    res.status(200).json({
      status: "success",
      userData,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, photo, email } = req.body;

    // if email in use
    const user = await ifUserExist(email);
    if (!user) {
      return res.json({
        status: "fail",
        message: "no user found",
      });
    }

    user.name = name;
    user.photo = photo;

    const query = {
      email,
    };

    // update user
    const result = await User.updateOne(query, { $set: user });

    // send result
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export { createAUser, userLogin, updateUser, getAllUser };
