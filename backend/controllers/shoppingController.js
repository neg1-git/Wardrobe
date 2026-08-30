const Groq = require('groq-sdk')
const db = require('../config/db')

/**
 * GET /api/ai/shopping-plan
 *
 * Grounded AI Shopping Planner:
 * 1. Fetch user wardrobe items from database.
 * 2. Feed inventory details to Groq with strict JSON output schema.
 * 3. Return gap analysis, recommendations, and outfit combinations.
 */
const getShoppingPlan = async (req, res) => {
  const userId = req.user

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      msg: 'AI service is not configured. Please set the GROQ_API_KEY environment variable.'
    })
  }
  const groq = new Groq({ apiKey })

  try {
    // 1. Fetch user's closet inventory with wear details
    const wardrobeResult = await db.query(`
      SELECT ci.id, ci.name, ci.category, ci.color, ci.cost, ci.image_url,
             COALESCE(SUM(o.wear_count), 0) as total_wears
      FROM clothing_items ci
      LEFT JOIN outfit_items oi ON ci.id = oi.clothing_item_id
      LEFT JOIN outfits o ON oi.outfit_id = o.id AND o.user_id = $1
      WHERE ci.user_id = $1
      GROUP BY ci.id, ci.name, ci.category, ci.color, ci.image_url, ci.cost
    `, [userId])

    const items = wardrobeResult.rows

    // If wardrobe is empty
    if (items.length === 0) {
      return res.status(200).json({
        success: true,
        gapAnalysis: "Your wardrobe is currently empty! Add some tops, bottoms, and footwear to get personalized shopping recommendations.",
        recommendations: []
      })
    }

    // 2. Format items for prompt grounding
    const closetContext = items.map(item => (
      `- ID: ${item.id} | Name: "${item.name}" | Category: ${item.category} | Color: ${item.color} | Cost: ₹${item.cost || 0} | Wears: ${item.total_wears}`
    )).join('\n')

    // 3. Construct system instruction with strict JSON response instructions
    const systemPrompt = `You are an expert fashion stylist and smart wardrobe planner.
You analyze the user's current wardrobe and recommend exactly 3 items they should purchase to maximize outfit variety (wear-leveling) and get better utility out of their existing clothes.

Current Wardrobe Inventory:
${closetContext}

YOUR MISSION:
1. Conduct a "Gap Analysis" (e.g. noticing they have 6 tops but only 1 pair of pants, or missing neutral colors, or lacking a specific category like shoes).
2. Recommend exactly 3 items they should buy.
3. For each recommended item, specify:
   - "name": e.g., "Beige Chino Pants"
   - "category": e.g., "Bottoms"
   - "reason": A brief explanation of how it fills a gap in their closet and pairs with existing items.
   - "searchQuery": An optimized search term for Amazon/Myntra (e.g., "beige slim fit chinos men").
   - "roiImpact": A short sentence showing financial/wear utility (e.g., "Unlocks 4 new outfits and lowers average cost-per-wear by 12%").
   - "unlockedOutfits": List 2-3 outfit combinations they can make by combining this new item with their CURRENT clothes.
     Each outfit must have:
     - "name": e.g., "Smart Casual Friday"
     - "existingItems": An array of existing item UUIDs (matching the IDs in their inventory above) that make up the outfit alongside this new item. Do NOT include the recommended new item in this ID list.

CRITICAL: Return your response ONLY as a valid JSON object. Do not include markdown code fences (like \`\`\`json) or any extra conversational text.

Response Schema:
{
  "gapAnalysis": "A paragraph explaining the balance of their wardrobe and key gaps identified.",
  "recommendations": [
    {
      "name": "Recommended Item Name",
      "category": "Tops/Bottoms/Shoes/Accessories",
      "reason": "Styling reason",
      "searchQuery": "search query for Amazon",
      "roiImpact": "Cost-per-wear / value statement",
      "unlockedOutfits": [
        {
          "name": "Outfit Name",
          "existingItems": ["uuid-1", "uuid-2"]
        }
      ]
    }
  ]
}`

    // 4. Request completion from Groq
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Analyze my closet and provide the structured JSON shopping plan.' }
      ],
      model: 'qwen/qwen3.6-27b',
      temperature: 0.3,
    })

    let rawResponse = completion.choices[0]?.message?.content || '{}'
    
    // Strip Qwen's <think>...</think> reasoning tags
    rawResponse = rawResponse.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()
    // Strip markdown code fences if present (e.g., ```json ... ```)
    rawResponse = rawResponse.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()

    let planData
    try {
      planData = JSON.parse(rawResponse)
    } catch (parseErr) {
      console.error('Failed to parse AI response as JSON:', rawResponse)
      return res.status(500).json({
        success: false,
        msg: 'AI returned an invalid response. Please try again.'
      })
    }

    return res.status(200).json({
      success: true,
      ...planData,
      items: items
    })

  } catch (error) {
    console.error('AI Shopping Planner Error:', error)
    return res.status(500).json({
      success: false,
      msg: 'AI Shopping Planner encountered an error.'
    })
  }
}

module.exports = { getShoppingPlan }
