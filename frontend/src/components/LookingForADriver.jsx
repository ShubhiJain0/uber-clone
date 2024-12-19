import React, { useContext } from 'react'
import {motion} from 'framer-motion'
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { UserDataContext } from '../context/UserContext';
import WaitingForADriver from './WaitingForADriver';
const LookingForADriver = () => {

  const { waitForDriver, setWaitForDriver } = useContext(UserDataContext);
  
  const { confirmRide, setConfirmRide } = useContext(UserDataContext);
  
  const { vehiclePanelDetail, setVehiclePanelDetail } =
    useContext(UserDataContext);

    const { pickup , destination , userOtp, fare} = useContext(UserDataContext);
  
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full p-4  bg-white z-30 shadow-black shadow-2xl overflow-hidden"
      initial={{ y: "100%" }}
      animate={confirmRide ? { y: 0 } : { y: "100%" }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-2 flex justify-between">
        Looking for a driver
        <IoIosArrowDown
          className="inline-block"
          onClick={() => {
            setConfirmRide(false);
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
            <IoLocationSharp />
            <div>
              <h3 className="text-lg font-medium">From: </h3>
              <p className="text-sm ">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-b p-3">
            <IoLocationSharp />
            <div>
              <h3 className="text-lg font-medium">To: </h3>
              <p className="text-sm ">{destination}</p>
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
                  : 0}
              </h3>
              <p className="text-base text-gray-600">
                Kankariya talab , bhopal
              </p>
            </div>
          </div>
        </div>
        <button
          className="px-4 py-2 w-full bg-green-500  rounded-lg text-white my-1"
          onClick={() => {
            setConfirmRide(true);
            setWaitForDriver(true);
          }}
        >
          Make the payment
        </button>
      </div>
    </motion.div>
  );
}

export default LookingForADriver