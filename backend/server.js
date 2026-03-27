const express= require('express')
const app= express()
const cors = require('cors')
require('dotenv').config()
const authRoutes=require('./routes/authRoutes')
const apiRoutes=require('./routes/apiRoutes')
const outfitRoutes=require('./routes/outfitRoutes')

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/api',apiRoutes)
app.use('/outfit',outfitRoutes)

app.listen(5000,()=>{
  console.log('Server is listening at 5000...')
})
