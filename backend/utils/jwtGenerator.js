const jwt = require("jsonwebtoken");
require("dotenv").config(); 

function jwtGenerator(user_id) {

  const payload = {
    user: user_id
  };

  console.log("MY SECRET KEY IS:", process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;