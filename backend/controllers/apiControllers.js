const db = require('../config/db')

const addItems = async(req,res)=>{

  let {name,category,color,image_url}=req.body;
  let user_id=req.user;

  try {
    const result = await db.query('insert into clothing_items(user_id,name,category,color,image_url) values($1,$2,$3,$4,$5) returning *',[user_id,name,category,color,image_url])

    return res.status(200).json({success:true,msg:result.rows[0]})
  } catch (error) {
    return res.status(401).json({success:false,msg:'SERVER ERROR'})
  }
}

module.exports={
  addItems
}