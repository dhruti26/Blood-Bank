const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController } = require('../controllers/inventoryController')
const router = express.Router()

//add inventory - post,only login user can access bcoz of authMiddleware
router.post('/create-inventory',authMiddleware,createInventoryController)
module.exports = router