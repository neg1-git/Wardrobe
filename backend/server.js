const express= require('express')
const app= express()
const cors = require('cors')
const authRoutes=require('./routes/authRoutes')
const apiRoutes=require('./routes/apiRoutes')
const outfitRoutes=require('./routes/outfitRoutes')

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/api',apiRoutes)
app.use('/outfit',outfitRoutes)

// app.listen(5000,()=>{
//   console.log('Server is listening at 5000...')
// })

module.exports = app

if (require.main === module) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}...`)
  })
}
