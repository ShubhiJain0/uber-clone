const rideService = require("../services/ride.service")

const { validationResult } = require("express-validator")

const mapService = require("../services/maps.service");

const {sendMessageToSocketId} = require("../socket.js");

const rideModel = require("../models/ride.model");

module.exports.createRide = async ( req, res) =>{
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log(errors);
    
    return res.status(400).json({errors : errors.array()});
  }

  const { userId , pickup , destination , vehicleType} = req.body;

  try {
    const ride = await rideService.createRide({user : req.user._id , pickup , destination , vehicleType})


    const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
    console.log("pick up ", pickupCoordinates);
    

    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd , pickupCoordinates.lng , 5)

    //console.log(captainsInRadius);
    

    // ride.otp = ""

    const rideWithUser = await rideModel.findOne({_id: ride._id}).populate("user")

    console.log(rideWithUser);
    rideWithUser.otp=""

    captainsInRadius.map(captain =>{
     sendMessageToSocketId(captain.socketId, {
       event: "new-ride",
       data: rideWithUser,
     }); 
    })
    
    return res.status(201).json(ride);    

  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message : error.message});
  }
}

module.exports.getFare= async (req, res, next)=>{

  //console.log("hello");
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      
      return res.status(400).json({ errors : errors.array() });
    }

    const { pickup , destination} = req.query;

    try {
      const fare = await rideService.getFare(pickup , destination);
      return res.status(200).json(fare);

    } catch (error) {
      console.log(error);
      
    }
}


module.exports.confirmRide=async(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });

  }

  const {rideId, captainId} = req.body;

  try {
    const ride = await rideService.confirmRide(rideId , captainId)

    sendMessageToSocketId(ride.user.socketId, {
      event : 'ride-confirmed',
      data : ride
    })

    return res.status(200).json(ride)

  } catch ( err ) {
      console.log(err);
      
    return res.status(500).json({message : err.message })

  }
}

module.exports.startRide=async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      
      return res.status(400).json({errors: errors.array()});
    }

    const { rideId , otp} = req.query;

    console.log(rideId, otp);
    

    try {
      const ride = await rideService.startRide({rideId , otp, captain: req.captain })
      sendMessageToSocketId(ride.user.socketId , {
        event: 'ride-started',
        data: ride
      })
      return res.status(200).json(ride)
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: error.message})
    }
}