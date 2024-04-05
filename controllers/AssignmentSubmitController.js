import AssignmentSubmit from "../models/AssignmentSubmitModel.js";

const createAAssignmentSubmit = async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      studentPhoto,
      assignmentLink,
      assignmentSubmitDesc,
      assignmentSubmitTitle,
    } = req.body;

    const assignmentData = {
      studentName,
      studentEmail,
      studentPhoto,
      assignmentLink,
      assignmentSubmitDesc,
      assignmentSubmitTitle,
    };

    const assignment = new AssignmentSubmit(assignmentData);
    const result = await assignment.save();

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

const assignmentResult = async (req, res) => {
  try {
    const { studentEmail, totalMark, achievedMark, resultDesc } = req.body;

    const resultData = {
      totalMark,
      achievedMark,
      resultDesc,
    };

    const query = {
      studentEmail,
    };
    const assignment = await AssignmentSubmit.findOne(query);

    assignment.assignmentResult = resultData;

    const result = await AssignmentSubmit.updateOne(query, {
      $set: assignment,
    });

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

export { createAAssignmentSubmit, assignmentResult };
