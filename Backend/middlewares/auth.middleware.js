const userModel = require("../models/users.models")

const blackListedTokenModel= require("../models/blackListToken.model")

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const captainModel = require("../models/captain.model");

module.exports.authUser = async( req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    //console.log(token);
    

    if(!token){
      return res.status(401).json({message: 'Unauthorized'})
    }

    const isBlackListed = await blackListedTokenModel.findOne({token : token})
    
    if(isBlackListed){
      
      console.log("black listed");
      
      return res.status(401).json({message: 'Unauthorized'})
    }

    try {
      const decoded = jwt.verify(token , process.env.JWT_SECRET);
      const user = await userModel.findById(decoded._id);

      req.user = user;
       // console.log(req.user);
        
      return next();

    } catch (error) {
      
    return res.status(401).json({ message: "Unauthorized" });
    }

}

module.exports.authCaptain = async (req,res, next)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  //console.log(token);
  

  if(!token){
    return res.status(401).json({message: "Unauthorized"});
  }

  const isBlackListed = await blackListedTokenModel.findOne({token : token});

  if(isBlackListed){
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    //console.log(decoded);
    
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();

    //mene add kiya 

  } catch (error) {
    res.status(401).json({message : 'Unauthorized'})
  }

}