import Class from "../models/classModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import isStudentExist from "../utils/isStudentExist.js";

const createAClass = async (req, res) => {
  try {
    const { classTitle, classDesc, classTeacher, classPassword } = req.body;

    // check credentials
    if (!classTitle || !classDesc || !classTeacher || !classPassword) {
      return res.json({
        status: "fail",
        message: "please provide your credentials",
      });
    }

    // hash class password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(classPassword, salt);

    // class data
    const classData = {
      classTitle,
      classDesc,
      classTeacher,
      classPassword: hashPassword,
    };

    // send to database
    const newClass = new Class(classData);
    const result = await newClass.save();

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const findAllClass = async (req, res) => {
  try {
    const result = await Class.find({});

    res.status(200).json({
      status: "success",
      class: result,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};
const findClassById = async (req, res) => {
  try {
    // get id
    const _id = req.params.id;

    // find class
    const singleClass = await Class.findById(_id);

    // send response
    res.status(200).json({
      status: "success",
      singleClass,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const addStudentToClass = async (req, res) => {
  try {
    // get credentials
    const { name, email, photo, classId, password } = req.body;

    // check credentials
    if (!name || !email || !photo || !classId || !password) {
      return res.json({
        status: "fail",
        message: "please provide your credentials",
      });
    }

    // match password
    const inputClass = await Class.findById(classId);
    const match = await bcrypt.compare(password, inputClass.classPassword);
    if (!match) {
      return res.json({
        status: "fail",
        message: "wrong password",
      });
    }
    const userData = {
      name,
      email,
      photo,
    };
    // student array
    const oldStudentArray = inputClass.students;

    // check if student already in

    const isExist = isStudentExist(email, oldStudentArray);

    // if student not in class
    if (!isExist) {
      // add user
      const newStudentArray = [...oldStudentArray, userData];
      inputClass.students = newStudentArray;

      // query
      const query = {
        _id: classId,
      };

      // update data
      const result = await Class.updateOne(query, { $set: inputClass });
    }

    res.status(200).json({
      status: "success",
      inputClass,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const promoteAStudentToCoTeacher = async (req, res) => {
  try {
    const { studentEmail, classId } = req.body;

    const query = {
      _id: classId,
    };

    const inputClass = await Class.findOne(query);

    inputClass.coTeacher = studentEmail;

    const result = await Class.updateOne(query, { $set: inputClass });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

const createAHomeWork = async (req, res) => {
  try {
    const { homeworkLink, homeworkTitle, homeworkDesc, classId } = req.body;

    const homeWorkData = {
      homeworkLink,
      homeworkTitle,
      homeworkDesc,
    };

    const query = {
      _id: classId,
    };

    const inputClass = await Class.findOne(query);

    const oldHomework = inputClass.homework;
    const newHomework = [...oldHomework, homeWorkData];
    inputClass.homework = newHomework;

    const result = await Class.updateOne(query, { $set: inputClass });

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: error.message,
      error,
    });
  }
};

export {
  createAClass,
  findAllClass,
  findClassById,
  addStudentToClass,
  promoteAStudentToCoTeacher,
  createAHomeWork,
};
