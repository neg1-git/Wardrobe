const express=require('express')
const { addOutfit } = require('../controllers/outfitControllers')
const { Authorize } = require('../middlewares/authorisation')
const router=express.Router()

router.route('/add').post(Authorize,addOutfit)

module.exports = router