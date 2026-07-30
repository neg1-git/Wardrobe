const express = require('express')
const router = express.Router()
const { Authorize } = require('../middlewares/authorisation')
const { chatWithCloset } = require('../controllers/aiController')
const { getShoppingPlan } = require('../controllers/shoppingController')

// POST /api/ai/chat — Conversational closet assistant
router.route('/chat').post(Authorize, chatWithCloset)

// GET /api/ai/shopping-plan — AI shopping planner gap analysis and recommendations
router.route('/shopping-plan').get(Authorize, getShoppingPlan)

module.exports = router
