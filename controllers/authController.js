const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

const loginController=async(req,res)=>{
  try{
    const user = await userModel.findOne({ email: req.body.email });
    if(!user){
      //404-Page Not Found
      return res.status(404).send({
        success:false,
        message : 'User Not Found'
      })
    }
    //check role
     if(user.role !== req.body.role){
        //if not from mentioned options
        return res.status(500).send({
          success:false,
          message : 'User Role Invalid'
        })
     }
    //check password
    const comparePassword= await bcrypt.compare(req.body.password,user.password)
    if(!comparePassword){
      return res.status(500).send({
        success:false,
        message : 'Invalid Password'
      })
    }
    //token expires after 1 day,so user need to login again on second day
    //token encrypted
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    //200 -OK status
    return res.status(200).send({
      success:true,
      message:'Login Successful!',
      token,
      user,
    });
  }catch(error){
    console.log(error);
    //500 - Internal Server Error
    res.status(500).send({
      success:false,
      message:'Error in Login API',
      error,
    });
  }
};

//get current user
const currentUserController=async(req,res)=>{
  try{
     const user=await userModel.findOne({_id:req.body.userId})
     return res.status(200).send({
      success:true,
      message:'User Fetched Successfully!',
      user,
    })
  }catch(error){
    console.log(error);
    res.status(500).send({  
      success:false,
      message:'Unable to get current user',
      error,
    })
  }
};
module.exports = { registerController,loginController,currentUserController};
