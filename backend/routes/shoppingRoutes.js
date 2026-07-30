const express = require('express')
const router = express.Router()
const { Authorize } = require('../middlewares/authorisation')
const { getShoppingPlan } = require('../controllers/shoppingController')

// GET /api/ai/shopping-plan — AI Shopping Planner gap analysis and recommendations
router.route('/shopping-plan').get(Authorize, getShoppingPlan)

module.exports = router
