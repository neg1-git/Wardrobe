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

const addItems= async (req,res)=>{
  const user_id=req.user;
  const {outfit_id,clothing_item_id}=req.body;  
  try {
    
    const check1= await db.query('select user_id from outfits where id=$1',[outfit_id])

    if(!check1.rows[0] || check1.rows[0].user_id!=user_id){
      return res.status(401).json({success:false,msg:'OUTFIT DOESNT BELONG TO THIS ID!!!'})
    }

    let results=[];

    for(let id of clothing_item_id){

      const check2= await db.query('select user_id from clothing_items where id=$1',[id])

      if(!check2.rows[0] || check2.rows[0].user_id!=user_id){
        return res.status(401).json({success:false,msg:'CLOTHES DONT BELONG TO THIS ID!!!'})
      }

      const result=await db.query('insert into outfit_items (outfit_id,clothing_item_id) values ($1,$2) returning *',[outfit_id,id])

      results.push(result.rows[0])
    }

    return res.status(200).json({success:true,data:results})

  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,msg:'ERROR!!!'})
  }
}

const getOutfits=async(req,res)=>{
  const id=req.user;
try {

  const result= await db.query('select * from outfit_items oi JOIN clothing_items c ON oi.clothing_item_id = c.id JOIN outfits o ON oi.outfit_id = o.id where o.user_id=$1',[id])

  return res.status(200).json({success:true,data:result.rows})
  
} catch (error) {
  console.log(error)
  return res.status(500).json({success:false,msg:"ERROR"})
}
}

const deleteOutfit = async (req,res)=>{
  const user_id=req.user
  const {outfit_id}=req.params
try {
  const check=await db.query('select user_id from outfits where id=$1',[outfit_id]);
  if(!check.rows[0] || user_id!=check.rows[0].user_id){
    return res.status(400).json({success:false,msg:'OUTFIT DOESNT BELONG TO THIS USER ID'})
  }

  const result = await db.query('delete from outfits where id=$1 returning *',[outfit_id])

  return res.status(200).json({success:true,data:result.rows[0]})
} catch (error) {
  console.log(error)
  return res.status(500).json({success:false,msg:"ERROR"})
}
}

module.exports={
  addOutfit,
  addItems,
  getOutfits,
  deleteOutfit
}