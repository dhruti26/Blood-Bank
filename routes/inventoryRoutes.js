const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController,getDonorsController } = require('../controllers/inventoryController')
const router = express.Router()

//add inventory - post,only login user can access bcoz of authMiddleware
router.post('/create-inventory',authMiddleware,createInventoryController)

//get inventory records - get
router.get('/get-inventory',authMiddleware,getInventoryController);

//get donor records - get
router.get("/get-donors", authMiddleware,getDonorsController);
module.exports = router