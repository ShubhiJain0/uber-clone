import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const WaitingForADriver = () => {
  
  
  const {waitingForDriverData , setWaitingForDriverData} = useContext(UserDataContext)

  
  const {
    captain: {
      fullname: { firstname="", lastname="" },
      vehicle:{
        color="", capacity="" , plate=""
      },
    },
  } = waitingForDriverData;



  

  const navigate = useNavigate();
  const { waitForDriver, setWaitForDriver, userOtp } =
    useContext(UserDataContext);

  const {
    vehiclePanelDetail,
    setVehiclePanelDetail,
    pickup,
    destination,
    fare,
  } = useContext(UserDataContext);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full p-4  bg-white z-30 shadow-black shadow-2xl overflow-hidden"
      initial={{ y: " 100%" }}
      animate={waitForDriver ? { y: 0 } : { y: "100%" }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-2 flex justify-between">
        waiting for the driver
        <IoIosArrowDown
          className="inline-block"
          onClick={() => {
            setWaitForDriver(false);
          }}
        />
      </h3>
      <div className="flex border border-grey-400 active:border-black justify-center flex-col items-center w-full p-3">
        <img
          src={
            vehiclePanelDetail === "car"
              ? "https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180"
              : vehiclePanelDetail === "moto"
              ? "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              : vehiclePanelDetail === "auto"
              ? "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
              : ""
          }
          className=" h-28 border-b "
          alt=""
        />

        <div className="w-full">
          <div className="flex items-center gap-5 border-b p-3">
            <div>
              <h3 className="text-lg font-medium">
                Share OTP with Driver: {userOtp}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b p-3">
            <div>
              <div className="flex space-x-4 items-center border-b">
                <h3 className="text-lg font-medium">Driver name: </h3>
                <p className="inline-block">
                  {firstname} {lastname}
                </p>
              </div>
              <div className="flex space-x-4 items-center">
                <h3 className="text-lg font-medium">Vehicle Details: </h3>
                <div>
                  <p className="">plate Number: {plate}</p>
                  <p className="">Color: {color}</p>
                  <p className="">Capacity: {capacity}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b p-3">
            <IoLocationSharp />
            <div>
              <h3 className="text-sm font-medium">{pickup}</h3>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b p-3">
            <IoLocationSharp />
            <div>
              <h3 className="text-sm font-medium">{destination}</h3>
              
            </div>
          </div>
          <div className="flex items-center gap-5 border-b p-3">
            <IoCashOutline className="inline-block" />
            <div className="">
              <h3 className="text-lg font-medium">
                {vehiclePanelDetail === "car"
                  ? fare.car.toFixed(2)
                  : vehiclePanelDetail === "moto"
                  ? fare.moto.toFixed(2)
                  : vehiclePanelDetail === "auto"
                  ? fare.auto.toFixed(2)
                  : ""}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full space-x-4">
          <button
            className="px-4 py-2 w-[45%] bg-green-500  rounded-lg text-white my-1"
            onClick={() => {
              navigate("/riding");
            }}
          >
            Go cashless
          </button>

          <button className="px-4 py-2 w-[45%] bg-yellow-500   rounded-lg text-white my-1 ">
            Pay Later
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WaitingForADriver;
