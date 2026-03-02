const express= require('express')
const app= express()
const cors = require('cors')
const db = require('./config/db');
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.listen(5000,()=>{
  console.log('Server is listening at 5000...')
})
