const db = require('../config/db')
const bcrypt=require('bcrypt')
const jwtGenerator=require('../utils/jwtGenerator')
const Authorize=require('../middlewares/authorisation')

const register=async(req,res)=>{
  const {name, email, password}=req.body
  if (!name || !email || !password){
    return res.status(400).json({success:false,msg:'Invalid Input'})
  }

  const check= await db.query('select * from users where email = $1',[email]);
  if(check.rows.length!=0){
    return res.status(400).json({success:false,msg:'Email already exists!'})
  }

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);

  try {
    const result= await db.query('insert into users (name, email, password) values ($1,$2,$3) returning *',[name,email,bcryptPassword])

    res.json({success:true,msg:result.rows[0].id})
  } catch (error) {
    res.status(400).json({success:false,id:'SERVER ERROR'})
    console.log(error)
  }
}

const login= async(req,res)=>{
  const {email, password}=req.body;
  const result= await db.query('Select * from users where email=$1',[email])

  if(result.rows.length===0){
    return res.status(400).json({success:false,msg:'Email does not exist!!!'})
  }

  const hashedPassword = result.rows[0].password
  const validPassword = await bcrypt.compare(password,hashedPassword)

  if(!validPassword){
    //const token = jwtGenerator(result.rows[0].user_id);
    
    return res.status(400).json({ success:false,msg:'INCORRECT PASSWORD' });
  }
  else{
    const token = jwtGenerator(result.rows[0].user_id);
    return res.status(200).json({success:true,msg:'SIGNED IN',token:token})
  }
}

module.exports={
  register,
  login
}