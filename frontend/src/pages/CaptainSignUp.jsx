import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import { CaptainContextData } from "../context/CaptainContext";
import { color } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CaptainSignUp = () => {
  
  const navigate = useNavigate();

  const {CaptainAuth , setCaptainAuth} = useContext(CaptainContextData)

  const [email, setEmail] = useState("");


  const [password, setPassword] = useState("");

  const [ firstName , setFirstName] = useState("");

  
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState(""); 
  
  
  const [vehicleCapacity, setVehicleCapacity] = useState(1);
  
  const [vehiclePlate, setVehiclePlate] = useState("");

  const [vehicleType, setVehicleType] = useState("");
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      },
    };
   // console.log(captainData);
    
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/captains/register`,
          captainData
        );

        if (response.status === 201) {
          const data = response.data;
          setCaptainAuth(data.captain);
          localStorage.setItem("token", data.token);
          navigate("/captain-home");
        }

        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setVehicleCapacity(1);
        setVehicleColor("");
        setVehicleColor("");
        setVehicleType("");

        
  };

  return (
    <AnimationWrapper>
      <div className="p-7 flex justify-between h-screen flex-col">
        <div>
          <img
            className="my-5 w-[100px] ml-3 z-[2]"
            src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
            alt="Uber Logo"
          />
          <form action="" onSubmit={handleSubmit}>
            <h3>What's your name?</h3>

            <div className="flex space-x-3 my-4">
              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3>Enter Vehicle details</h3>
            <div className="flex space-x-3 my-4">
              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="vehicle color"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
              />

              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="plate number"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
              />
            </div>

            <div className="flex space-x-3 my-4">
              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="vehicle capacity"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(Number(e.target.value));
                  console.log(vehicleCapacity);
                }}
              />
              <select
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base"
                type="text"
                placeholder="type"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              >
                <option value="" disabled>Select Vehicle type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <h3>Enter Email</h3>

            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3>Enter password</h3>
            <input
              className="bg-[#eeeeee]
        mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>{
               // console.log(e.target.value);
                
                setPassword(e.target.value)
              }}
            />

            <button className="mb-7 rounded px-4 py-2 w-full text-lg bg-black text-white">
              Sign up
            </button>
          </form>
          <p className="text-center">
            Already have an Account?
            <Link
              to={"/captain-login"}
              className="my-3 text-blue-600 underline underline-offset-2 ml-1"
            >
              Login here
            </Link>
          </p>
        </div>

        <div>
          <Link
            to={"/user-sign-up"}
            className=" block mb-7 rounded px-4 py-2 w-full text-lg bg-black text-white text-center"
          >
            Sign up as User
          </Link>
          <p></p>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default CaptainSignUp;
