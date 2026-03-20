const express= require('express')
const app= express()
const cors = require('cors')
require('dotenv').config()
const authRoutes=require('./routes/authRoutes')
const apiRoutes=require('./routes/apiRoutes')

app.use(cors())
app.use(express.json())

app.use('/auth',authRoutes)
app.use('/api',apiRoutes)

app.listen(5000,()=>{
  console.log('Server is listening at 5000...')
})
