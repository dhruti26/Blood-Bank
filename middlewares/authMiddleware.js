//next function refers as middleware,till next() is called things after that will not be called
const JWT=require('jsonwebtoken')

//Authentication Middleware for checking routes
module.exports=async(req,res,next)=>{
   try{
     //user token
      const token=req.headers['authorization'].split(" ")[1]; //1st argument-Bearer test 2nd argument-Token
       //decrypt token-decode contain token id
      JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
         if(err){
            return res.status(401).send({
               success:false,
               message:'Authentication Fails'
            })
         }else{
              req.body.userId=decode.userId;
              next();
         }
      });
   }catch(error){
    console.log(error);
    //401 -Unauthorized Access
    res.status(401).send({
       success:false,
       message:'Authentication Fails',
       error
     })
   }
}