const Groq = require('groq-sdk')
const db = require('../config/db')

/**
 * Build a system instruction grounded in the user's live wardrobe data.
 * This is the "context engineering" step — we query PostgreSQL and serialize
 * the results into a text block that the LLM treats as its knowledge base.
 */
const buildSystemInstruction = (items) => {
  const itemList = items.map((item) => {
    const wears = parseInt(item.total_wears) || 0
    const cpw = item.cost_per_wear ? `₹${item.cost_per_wear}` : 'N/A'
    return `- ID ${item.id}: "${item.name}" | Category: ${item.category || 'Unknown'} | Color: ${item.color || 'Unknown'} | Cost: ₹${item.cost || 0} | Times Worn: ${wears} | Cost-Per-Wear: ${cpw}`
  }).join('\n')

  return `You are "Ace", an intelligent wardrobe assistant built into the Wardrobe app.
You have access to the user's LIVE closet inventory queried from their database:

${itemList || '(The user has no items in their wardrobe yet.)'}

YOUR RULES:
1. GROUNDING: You may ONLY reference items from the list above. NEVER suggest clothes the user does not own. If they ask for something not in their closet, say so.
2. WEAR-LEVELING: When recommending outfits, prioritize items with LOW wear counts to help the user rotate their wardrobe evenly and get value from every purchase.
3. COST AWARENESS: Use cost-per-wear data to highlight items that are great value (low CPW) or under-utilized (high CPW because rarely worn).
4. CONCISE & FRIENDLY: Keep responses conversational, concise, and structured. Use bullet points for outfit suggestions. NEVER output database IDs (UUIDs) to the user; always refer to items by their name and color (e.g., "blue Wide Jeans", "black Sambas Adidas").
5. ANALYTICS: You can answer questions about wardrobe stats (most worn, least worn, most expensive, best value, total wardrobe cost, etc.) using the data above.
6. If the user asks something completely unrelated to fashion or their wardrobe, politely redirect them.`
}

/**
 * POST /api/ai/chat
 * Body: { message: string, history: [{ role: 'user'|'model', text: string }] }
 *
 * Flow:
 * 1. Query the user's full wardrobe from PostgreSQL (with wear stats).
 * 2. Build a system instruction grounded in that data.
 * 3. Send the conversation history + new message to Gemini.
 * 4. Return the model's response.
 */
const chatWithCloset = async (req, res) => {
  const userId = req.user
  const { message, history = [] } = req.body

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ success: false, msg: 'Message is required.' })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      msg: 'AI service is not configured. Please set the GROQ_API_KEY environment variable.',
    })
  }

  const groq = new Groq({ apiKey })

  try {
    // Step 1: Query the user's wardrobe with wear analytics
    const wardrobeResult = await db.query(`
      SELECT ci.*,
             COALESCE(SUM(o.wear_count), 0) as total_wears,
             CASE
               WHEN ci.cost IS NULL OR ci.cost = 0 THEN NULL
               WHEN COALESCE(SUM(o.wear_count), 0) = 0 THEN ci.cost
               ELSE ROUND(ci.cost / SUM(o.wear_count), 2)
             END as cost_per_wear
      FROM clothing_items ci
      LEFT JOIN outfit_items oi ON ci.id = oi.clothing_item_id
      LEFT JOIN outfits o ON oi.outfit_id = o.id AND o.user_id = $1
      WHERE ci.user_id = $1
      GROUP BY ci.id, ci.name, ci.category, ci.color, ci.image_url, ci.cost, ci.user_id, ci.created_at
      ORDER BY ci.created_at DESC
    `, [userId])

    const items = wardrobeResult.rows

    // Step 2: Build the grounded system instruction
    const systemInstruction = buildSystemInstruction(items)

    // Step 3: Map the conversation history into Groq's (OpenAI compatible) format
    const messages = [
      { role: 'system', content: systemInstruction },
      ...history.map((msg) => ({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.text,
      })),
      { role: 'user', content: message }
    ]

    // Step 4: Send request to Groq completion endpoint
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
    })

    const response = chatCompletion.choices[0]?.message?.content || ''

    return res.status(200).json({
      success: true,
      reply: response,
    })

  } catch (error) {
    console.error('AI Chat Error:', error)

    // Return a user-friendly error if the API key is missing or invalid
    if (
      error.message?.includes('API_KEY') || 
      error.message?.includes('API key') || 
      error.message?.includes('apiKey')
    ) {
      return res.status(500).json({
        success: false,
        msg: 'AI service is not configured. Please set the GROQ_API_KEY environment variable.',
      })
    }

    // Handle rate limiting
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        msg: 'AI is temporarily busy. Please wait a few seconds and try again.',
      })
    }

    return res.status(500).json({ success: false, msg: 'AI service encountered an error.' })
  }
}

module.exports = { chatWithCloset }
