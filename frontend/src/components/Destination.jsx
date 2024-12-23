import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { CaptainContextData } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Destination = () => {

  const navigate = useNavigate(); 
  
  const [inputOtp , setInputOtp] = useState("");
  
  const { destinationReached, setDestinationReached,ride } =
    useContext(CaptainContextData);
    
console.log(ride);



const handleStartRide = async (rideId, otp) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId:ride._id, // This will be sent as ?rideId=value
          otp: inputOtp, // This will be sent as &otp=value
        },
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    console.log(response.data)

    if(response.status ===200){
      setDestinationReached(false);
      console.log("hello");
      
      navigate("/captain-riding")
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full p-2  bg-white z-50 shadow-black shadow-2xl overflow-hidden h-[95%]"
      initial={{ y: "100%" }}
      animate={destinationReached ? { y: 0 } : { y: "100%" }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-2 flex justify-between">
        Pick up location Reached!
        <IoIosArrowDown
          className="inline-block"
          onClick={() => {
            setDestinationReached(false);
          }}
        />
      </h3>
      <div className="flex gap-5 bg-yellow-400 py-2 px-4 rounded-xl">
        <div className="">
          <img
            src="https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-3.jpg"
            className="w-10 h-10 rounded-full"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-lg">Name</h1>
          <p className="text-sm">Price</p>
        </div>
      </div>
      <div className="flex border border-grey-400 active:border-black justify-center flex-col items-center w-full">
        <div className="w-full">
          <div className="flex items-center gap-5 border-b p-3">
            <IoLocationSharp />
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-base text-gray-600">
                Kankariya talab , bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b p-3">
            <IoLocationSharp />
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-base text-gray-600">
                Kankariya talab , bhopal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b p-3">
            <IoCashOutline className="inline-block" />
            <div className="">
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-base text-gray-600">
                Kankariya talab , bhopal
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <input
            type="text"
            placeholder="enter OTP"
            className="bg-gray-200 rounded-lg p-2 outline-none border border-gray-400  font-mono text-xl pl-6"
            value={inputOtp}
            onChange={(e) => {
              setInputOtp(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between w-full space-x-4">
          <button
            className="px-4 py-2 w-[50%] bg-red-500   rounded-lg text-white my-1 "
            onClick={() => {
              setDestinationReached(false);
            }}
          >
            Cancel Ride
          </button>
          <button
            className="px-4 py-2 w-[50%] bg-yellow-500   rounded-lg text-white my-1 "
            onClick={() => {
              handleStartRide();
            }}
          >
            Start Ride
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Destination;
