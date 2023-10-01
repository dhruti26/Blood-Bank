const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController,
     getInventoryController,
     getDonorsController,
     getHospitalController,
     getOrganizationController,
     getOrganizationForHospitalController,
     getInventoryHospitalController,
     getRecentInventoryController} = require('../controllers/inventoryController')
     
const router = express.Router()

//add inventory - post,only login user can access bcoz of authMiddleware
router.post('/create-inventory',authMiddleware,createInventoryController)

//get inventory records - get
router.get('/get-inventory',authMiddleware,getInventoryController);

//get recent (top 3) blood records - get
//GET RECENT BLOOD RECORDS
router.get( "/get-recent-inventory", authMiddleware,getRecentInventoryController);

//get donor records - get
router.get("/get-donors", authMiddleware,getDonorsController);

//get hospital records -get
router.get("/get-hospitals", authMiddleware,getHospitalController);

//GET organization records -get
router.get("/get-organization", authMiddleware, getOrganizationController);

//GET organization RECORDS
router.get("/get-organization-for-hospital",authMiddleware,getOrganizationForHospitalController);

//get consumer records in hospital page
router.post("/get-inventory-hospital", authMiddleware, getInventoryHospitalController );
module.exports = router