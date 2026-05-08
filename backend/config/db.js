const { Pool } = require('pg')

// Use DATABASE_URL from environment (Render provides this)
// Fall back to individual env vars for local development
const connectionString = process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  connectionString: connectionString,
})

pool.connect()
  .then(() => {
    console.log('PostgreSQL connected')
  })
  .catch((err) => {
    console.error('PostgreSQL connection error:', err.message)
    process.exit(1)
  })

module.exports = pool