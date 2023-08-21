const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    role:{
        type:String,
        required:[true,'Role type is required'],
        enum:['admin','organization','donor','hospital']
    },
    name:{
      type : String,
      required : function(){
        if(this.role === 'donor' || this.role === 'admin'){
            return true;
        }
         return false;
      }
    },
    organizationName  : {
        type : String,
        required : function(){
          if(this.role === 'organization'){
              return true;
          }
           return false;
        }
    },
    hospitalName :{
        type : String,
        required : function(){
          if(this.role === 'hospital'){
              return true;
          }
           return false;
        }
    },
   email : {
       type:String,
       required:[true,'Email is required'],
       unique : true    //using 1 email id 1 user can login
   },
   password : {
    type:String,
    required:[true,'Password is required'],
   },
   website : {
     type:String
   },
   address : {
      type:String,
      required:[true,'Address is required'],
   },
   phoneNumber : {
    type:String,
    required:[true,'Phone Number is required'],
   },
},{timestamps:true})

module.exports = mongoose.model('users',userSchema);
//everytime new role is created,we have time of creation