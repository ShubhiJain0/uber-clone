import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import VehicleDetail from "./VehicleDetail";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

const VehiclePanel = () => {
  const { isAnimating, setIsAnimating } = useContext(UserDataContext);

  const { vehiclePanelDetail, setVehiclePanelDetail } =
    useContext(UserDataContext);

  const { detailAnimation, setDetailAnimation } = useContext(UserDataContext);

  return (
    <motion.div
      className="fixed bottom-0 p-3 bg-white w-full z-20 shadow-black shadow-2xl"
      initial={{ y: "100%" }}
      animate={!isAnimating ? { y: "+100%" } : { y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold mb-2 flex justify-between">
        Choose a vehicle{" "}
        <IoIosArrowDown
          className="inline-block"
          onClick={() => {
            setIsAnimating(false);
            setVehiclePanelDetail("");
            setDetailAnimation(false);
          }}
        />
      </h3>
      <div
        className="flex border border-grey-400 active:border-black justify-between items-center w-full p-3"
        onClick={() => {
          setDetailAnimation(true);
          setVehiclePanelDetail("car");
        }}
      >
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.90_IXyFPb47LZ_AYAe1ylAHaEK&pid=Api&P=0&h=180"
          className=" h-16"
          alt=""
        />
        <div>
          <h4 className="font-medium text-sm">
            UberGo{" "}
            <span>
              <FaUser className="inline-block" />
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">₹193.20</h2>
      </div>
      <div
        className="flex border border-grey-400 active:border-black justify-between items-center w-full p-3 my-1"
        onClick={() => {
          setDetailAnimation(true);

          setVehiclePanelDetail("moto");
        }}
      >
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          className=" h-16"
          alt=""
        />
        <div>
          <h4 className="font-medium text-sm">
            UberGo{" "}
            <span>
              <FaUser className="inline-block" />
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">₹193.20</h2>
      </div>

      <div
        className="flex border border-grey-400 active:border-black justify-between items-center w-full p-3 my-1"
        onClick={() => {
          setDetailAnimation(true);

          setVehiclePanelDetail("auto");
        }}
      >
        <img
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          className=" h-16"
          alt=""
        />
        <div>
          <h4 className="font-medium text-sm">
            UberGo{" "}
            <span>
              <FaUser className="inline-block" />
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">₹193.20</h2>
      </div>
    </motion.div>
  );
};

export default VehiclePanel;
