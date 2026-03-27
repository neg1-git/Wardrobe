const db = require('../config/db')

const addOutfit=async(req,res)=>{
  const user_id=req.user
  const {name}=req.body
  try {
    const result=await db.query('insert into outfits(user_id,name) values($1,$2) returning *',[user_id,name])

    return res.status(201).json({success:true,data:result.rows[0]})
  } catch (error) {
    return res.status(500).json({success:false,msg:'ERROR!!'})
  }
}

module.exports={
  addOutfit
}