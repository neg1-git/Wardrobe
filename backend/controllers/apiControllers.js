const db = require('../config/db')

const addItems = async(req,res)=>{

  let {name,category,color,image_url,cost}=req.body;
  let user_id=req.user;

  try {
    const result = await db.query('insert into clothing_items(user_id,name,category,color,image_url,cost) values($1,$2,$3,$4,$5,$6) returning *',[user_id,name,category,color,image_url,cost])

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

const updateItem=async(req,res)=>{
  let {name,category,color,image_url,cost}=req.body;
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
      const result=await db.query('update clothing_items set name=$1, category=$2, color=$3, image_url=$4, cost=$5 where id=$6 returning *',[name,category,color,image_url,cost,id])

      return res.status(200).json({success:true,data:result.rows[0]})
    }

  } catch (error) {
    return res.status(500).json({success:false,msg:'SERVER ERROR'})
  }
}

const getCostInsights=async(req,res)=>{
  const user_id=req.user;
  try {
    // Total wardrobe value
    const totalValue=await db.query('SELECT COALESCE(SUM(cost), 0) as total_value FROM clothing_items WHERE user_id=$1',[user_id])

    // Cost per wear for each item
    const costPerWear=await db.query(`
      SELECT ci.id, ci.name, ci.category, ci.cost,
             COALESCE(o.wear_count, 0) as wear_count,
             CASE
               WHEN ci.cost IS NULL OR ci.cost = 0 THEN NULL
               WHEN COALESCE(o.wear_count, 0) = 0 THEN ci.cost
               ELSE ROUND(ci.cost / o.wear_count, 2)
             END as cost_per_wear
      FROM clothing_items ci
      LEFT JOIN outfit_items oi ON ci.id = oi.clothing_item_id
      LEFT JOIN outfits o ON oi.outfit_id = o.id AND o.user_id = $1
      WHERE ci.user_id = $1
      GROUP BY ci.id, ci.name, ci.category, ci.cost, o.wear_count
      ORDER BY cost_per_wear ASC NULLS LAST
    `,[user_id])

    // Most expensive items
    const mostExpensive=await db.query('SELECT * FROM clothing_items WHERE user_id=$1 AND cost IS NOT NULL ORDER BY cost DESC LIMIT 5',[user_id])

    // Items with best cost per wear
    const bestValue=await db.query(`
      SELECT ci.id, ci.name, ci.category, ci.cost,
             COALESCE(SUM(o.wear_count), 0) as total_wears,
             CASE
               WHEN ci.cost IS NULL OR ci.cost = 0 THEN NULL
               WHEN COALESCE(SUM(o.wear_count), 0) = 0 THEN ci.cost
               ELSE ROUND(ci.cost / SUM(o.wear_count), 2)
             END as cost_per_wear
      FROM clothing_items ci
      LEFT JOIN outfit_items oi ON ci.id = oi.clothing_item_id
      LEFT JOIN outfits o ON oi.outfit_id = o.id AND o.user_id = $1
      WHERE ci.user_id = $1 AND ci.cost IS NOT NULL
      GROUP BY ci.id, ci.name, ci.category, ci.cost
      HAVING COALESCE(SUM(o.wear_count), 0) > 0
      ORDER BY cost_per_wear ASC
      LIMIT 5
    `,[user_id])

    return res.status(200).json({
      success:true,
      totalWardrobeValue: totalValue.rows[0].total_value,
      costPerWear: costPerWear.rows,
      mostExpensive: mostExpensive.rows,
      bestValue: bestValue.rows
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,msg:'SERVER ERROR'})
  }
}

module.exports={
  addItems,
  getItems,
  deleteItem,
  updateItem,
  getCostInsights
}