const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create inventory
const createInventoryController=async(req,res)=>{
    try{
        const {email} = req.body; //destructing for better syntax
        //as key and value field both are same(email),write 1 time
        //validation
        const user= await userModel.findOne({email});
        if(!user){
             throw new Error('User Not Found')
        }
        // if(inventoryType === "in" && user.role != 'donor'){
        //     throw new Error('Not a donor account')
        // }
        // if(inventoryType === "out" && user.role != 'hospital'){
        //     throw new Error('Not a valid receiver account')
        // }
        
        //change modal form according to inventoryType :out
        if (req.body.inventoryType == "out") {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId);
            //calculate total in blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
              {
                $match: {
                  organization,
                  inventoryType: "in",
                  bloodGroup: requestedBloodGroup,
                },
              },
              {
                $group: {
                  _id: "$bloodGroup",
                  total: { $sum: "$quantity" },
                },
              },
            ]);
        // console.log("Total In", totalInOfRequestedBlood);
        //if totalInOfRequestedBlood is present then take total of it
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
     
         //calculate total in blood quantity
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & out Calculation
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    } 


        //save record in database
        const inventory=new inventoryModel(req.body);
        await inventory.save()   
        //201 - Created
        return res.status(201).send({
            success:true,
            message : "New blood Record Added"
        })
    }catch(error){
        console.log(error);
        //500 - Internal Server Error
        res.status(500).send({
          success:false,
          message:'Error in Create Inventory API',
          error
        })
    }
};

//get all blood records
const getInventoryController=async(req,res)=>{
   try{
    //based on userId which is stored using token
    //added filters-populate and sort,sort will show according to latest record on top
     const inventory =await inventoryModel.find({organization:req.body.userId}).populate('donor').populate('hospital').sort({createdAt : -1});
     return res.status(201).send({
        success:true,
        message : "All get records successfully!",
        inventory,
    })
   }catch(error){
        console.log(error);
        //500 - Internal Server Error
        res.status(500).send({
          success:false,
          message:'Error in Get all Inventory API',
          error
        })
    }
}

// get all donors record
const getDonorsController = async (req, res) => {
    try {
      //from token we get userId, userId is used to fulfill organization
      const organization = req.body.userId;
      //find donors
      const donorId = await inventoryModel.distinct("donor", {
        organization,
      });
      // console.log(donorId);
      //if donor id is same as _id then display donors
      const donors = await userModel.find({ _id: { $in: donorId } });
  
      return res.status(200).send({
        success: true,
        message: "Donor Record Fetched Successfully",
        donors,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in Donor records",
        error,
      });
    }
  };

  const getHospitalController = async (req, res) => {
    try {
      const organization = req.body.userId;
      //GET HOSPITAL ID-the hospital which are linked with this organization id will be displayed
      const hospitalId = await inventoryModel.distinct("hospital", {
        organization,
      });
      //FIND HOSPITAL -find _id same as hospitalId -indicates hospital record
      const hospitals = await userModel.find({
        _id: { $in: hospitalId },
      });
      return res.status(200).send({
        success: true,
        message: "Hospitals Data Fetched Successfully",
        hospitals,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In get Hospital API",
        error,
      });
    }
  };

  // get organization profile
const getOrganizationController = async (req, res) => {
  try {
    //if user is donor then only show organization list
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donor });
    //find _id same as org id
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Organization Data Fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};

//organization for hospital controller 
// GET ORG for Hospital
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });
    //find org
    const organizations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

module.exports={
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController};