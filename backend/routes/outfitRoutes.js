const express=require('express')

const { 
  addOutfit,
  addItems,
  getOutfits,
  deleteOutfit,
  markAsWorn,
  getInsights,
  isFavorite,
  getRecommendations
 } = require('../controllers/outfitControllers')

const { Authorize } = require('../middlewares/authorisation')
const router=express.Router()

router.route('/create').post(Authorize,addOutfit)
router.route('/add').post(Authorize,addItems)
router.route('/get-outfits').get(Authorize,getOutfits)
router.route('/delete/:outfit_id').delete(Authorize,deleteOutfit)
router.route('/:outfit_id/wear').post(Authorize,markAsWorn)
router.route('/insights').get(Authorize,getInsights)
router.route('/:outfit_id/favorite').patch(Authorize,isFavorite)
//patch and put
router.route('/recommendations').get(Authorize,getRecommendations)

module.exports = router