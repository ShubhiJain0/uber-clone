const express = require("express");

const router = express.Router();

const { body } = require("express-validator");

const captainController = require("../controllers/captain.controllers")

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be atleast 3 characters long"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("password must be atleast 3 characters long"),

  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("colors must be atleast 3 characters long"),

  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("colors must be atleast 3 characters long"),

  body("vehicle.capacity").isInt({ min: 3 })
    .withMessage("Minimum capacity must be 1"),

  body("vehicle.vehicleType")
    .isIn(['car' , 'motorcycle', 'auto'])
    .withMessage("colors must be atleast 3 characters long"),

] , captainController.registerCaptain);

module.exports = router;