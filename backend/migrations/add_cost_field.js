const db = require('../config/db')

async function addCostField() {
  try {
    await db.query('ALTER TABLE clothing_items ADD COLUMN IF NOT EXISTS cost DECIMAL(10,2)')
    console.log('Cost field added successfully to clothing_items table')
    process.exit(0)
  } catch (error) {
    console.error('Error adding cost field:', error)
    process.exit(1)
  }
}

addCostField()