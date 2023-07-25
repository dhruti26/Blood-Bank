const express=require('express');
const { testController } = require('../controllers/testController');
//rest object (const app=express(); )using all express functionality 
//router object uses only routing functionality of express
const router=express.Router();

//routes
router.get('/',testController);

//export
module.exports = router;