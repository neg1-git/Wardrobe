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

const getItems= async(req,res)=>{
  let user_id=req.user
  try {
    const result=await db.query('Select * from clothing_items where user_id=$1 ORDER BY created_at DESC',[user_id])
    return res.status(200).json({success:true,data:result.rows})
  } catch (error) {
    return res.status(500).json({success:false,msg:'SERVER ERROR'})
  }
}

const deleteItem=async(req,res)=>{
  const {id}=req.params;
  const userId=req.user;
  try {
    const check= await db.query('select user_id from clothing_items where id=$1',[id])

    if(!check.rows[0]){
      return res.status(404).json({success:false,msg:'ITEM DOESNT EXIST'})
    }
    
    if(userId!==check.rows[0].user_id){
      return res.status(403).json({success:false,msg:'NOT AUTHORISED!!!'})
    }else{
      const result=await db.query('delete from clothing_items where id=$1 returning *',[id])

      return res.status(200).json({success:true,data:result.rows[0]})
    }
    
  } catch (error) {
    return res.status(500).json({success:false,msg:'SERVER ERROR'})
  }
}

module.exports={
  addItems,
  getItems,
  deleteItem
}