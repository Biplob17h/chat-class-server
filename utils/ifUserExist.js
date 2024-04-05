import User from "../models/userModel.js";

const ifUserExist = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

export default ifUserExist;
