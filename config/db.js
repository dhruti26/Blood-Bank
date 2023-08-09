const mongoose=require('mongoose');
const colors=require('colors');

const connectDB = async()=>{
    try{
      await mongoose.connect("mongodb://localhost:27017/blood-bank")
      console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch(error){
      console.log(`MongoDB database Error ${error}`.bgRed.white);
    }
}

module.exports=connectDB