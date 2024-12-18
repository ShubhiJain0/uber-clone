const rideModel = require('../models/ride.model')

const mapService = require('./maps.service');

const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pick up and destination are required.");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto:
      baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.auto +
      (distanceTime.duration.value/60) * perMinuteRate.auto,

    car:
      baseFare.car +
      (distanceTime.distance.value / 1000) * perKmRate.car +
      (distanceTime.duration.value/60) * perMinuteRate.car,

    bike:
      baseFare.bike +
      (distanceTime.distance.value / 1000) * perKmRate.bike +
      (distanceTime.duration.value/60) * perMinuteRate.bike,
  };
  return fare;
}

function getOtp(num){
  function generateOtp(num){
    const otp = crypto.randomInt(Math.pow(10 , num-1) , Math.pow(10 , num));
  
    return otp.toString();
  }
  return generateOtp(num);
}

module.exports.createRide = async ( { 
  user, pickup , destination , vehicleType
})=>{
    if( !user || !pickup || !destination || !vehicleType){
      throw new Error('All fields are required');
    }

    const fare = await getFare(pickup , destination);

    const ride = rideModel.create({
      user , 
      pickup , 
      destination ,
      otp : getOtp(4),
      fare:  fare[vehicleType]
    })

    return ride;
}

