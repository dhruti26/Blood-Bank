const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); //hash normal password
    req.body.password = hashedPassword;
    //accessing rest data
    const user = new userModel(req.body);
    await user.save();
    //201 -- indicates something has been created
    return res.Status(201).send({
      success: true,
      message: "User Registered Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};
module.exports = { registerController };
