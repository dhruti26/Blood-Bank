 const testController=(req,res)=>{
    //created call back function
   res.status(200).send({
    message:"Welcome to Blood Bank",
    success:true,
   });
};

module.exports = { testController };

