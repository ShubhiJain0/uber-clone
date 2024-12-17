import React, { useContext } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { CaptainRideDetailContext } from "../context/CaptainDetailContext";

const AcceptRide = () => {
  
  const { accept, setAccept } = useContext(CaptainRideDetailContext);  
  const {rideConfirm, setRideConfirm} = useContext(CaptainRideDetailContext);
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full p-4  bg-white z-30 shadow-black shadow-2xl overflow-hidden"
      initial={{ y: "100%" }}
      animate={accept ? { y: 0 } : { y: "100%" }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-2 flex justify-between">
        A new Ride for you!
        <IoIosArrowDown
          className="inline-block"
          onClick={() => {
            setAccept(false);
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
      <div className="flex border border-grey-400 active:border-black justify-center flex-col items-center w-full p-3">
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
        <div className="flex justify-between w-full space-x-4">
          <button className="px-4 py-2 w-[45%] bg-green-500  rounded-lg text-white my-1"
          onClick={()=>{
            setRideConfirm(true);
          }}
          >
            Accept
          </button>

          <button
            className="px-4 py-2 w-[45%] bg-gray-400   rounded-lg text-white my-1 "
            onClick={() => {
              setAccept(false);
            }}
          >
            Ignore
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AcceptRide;