const express=require('express')
const router=express.Router()
const {Authorize}=require('../middlewares/authorisation')
const {
  addItems,
  getItems,
  deleteItem,
  updateItem,
  getCostInsights
} = require('../controllers/apiControllers')

router.route('/clothes').post(Authorize,addItems)
router.route('/wardrobe').get(Authorize,getItems)
router.route('/wardrobe/:id').delete(Authorize,deleteItem).put(Authorize,updateItem)
router.route('/cost-insights').get(Authorize,getCostInsights)

module.exports=router