const express=require('express')

const { 
  addOutfit,
  addItems,
  getOutfits,
  deleteOutfit,
  markAsWorn
 } = require('../controllers/outfitControllers')

const { Authorize } = require('../middlewares/authorisation')
const router=express.Router()

router.route('/create').post(Authorize,addOutfit)
router.route('/add').post(Authorize,addItems)
router.route('/get-outfits').get(Authorize,getOutfits)
router.route('/delete/:outfit_id').delete(Authorize,deleteOutfit)
router.route('/:outfit_id/wear').post(Authorize,markAsWorn)

module.exports = router