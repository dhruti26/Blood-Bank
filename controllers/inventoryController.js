const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

//create inventory
const createInventoryController=async(req,res)=>{
    try{
        const {email,inventoryType} = req.body; //destructing for better syntax
        //as key and value field both are same(email),write 1 time
        //validtion
        const user= await userModel.findOne({email});
        if(!user){
             throw new Error('User Not Found')
        }
        if(inventoryType === "in" && user.role != 'donor'){
            throw new Error('Not a donor account')
        }
        if(inventoryType === "out" && user.role != 'hospital'){
            throw new Error('Not a valid receiver account')
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

module.exports={createInventoryController};