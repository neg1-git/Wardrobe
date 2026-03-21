const express=require('express')
const router=express.Router()
const {Authorize}=require('../middlewares/authorisation')
const { 
  addItems,
  getItems,
  deleteItem
} = require('../controllers/apiControllers')

router.route('/clothes').post(Authorize,addItems)
router.route('/wardrobe').get(Authorize,getItems)
router.route('/wardrobe/:id').delete(Authorize,deleteItem)

module.exports=router