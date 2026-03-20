const express=require('express')
const router=express.Router()
const {Authorize}=require('../middlewares/authorisation')
const { 
  addItems
} = require('../controllers/apiControllers')

router.route('/clothes').post(Authorize,addItems)

module.exports=router