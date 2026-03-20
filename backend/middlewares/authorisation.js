const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authorize= async(req,res,next)=>{
  try {
    const jwtToken = req.header("token");

    if(!jwtToken){
      return res.status(401).json({success:false,msg:"Not Authorised"})
    }

    const payload=jwt.verify(jwtToken,process.env.JWT_SECRET)
    console.log("Payload:",payload)

    req.user=payload.user //THIS REQ.USER IS USED TO THEN USE THIS USERID TO GET STUFF FROM SQL WHEN REQ 
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json({success:false,msg:'NOT AUTHORISED'})
  }
}

module.exports={Authorize}