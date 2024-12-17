import React, { useContext, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import {motion} from 'framer-motion'
import VehiclePanel from './vehiclePanel';
import WaitingForADriver from './WaitingForADriver';
import VehicleDetail from './VehicleDetail';
import LookingForADriver from './LookingForADriver';
import { VehicleDetailsContext } from '../context/VehicleContext';

const LocationSearchPanel = () => {


 const {isAnimating, setIsAnimating} = useContext(VehicleDetailsContext);

  const handleAnimation =()=>{
      setIsAnimating(true);
  }

  const {apple} = useContext(VehicleDetailsContext);
  

  return (
    <div>
      <div
        className="flex items-center justify-start p-4 border overflow-hidden border-grey-500 active:border-black my-4"
        onClick={() => {
          handleAnimation();
        }}
      >
        <h2 className="bg-[#eee] p-2 rounded-full flex justify-center items-center ">
          <FaLocationDot />
        </h2>
        <h4 className="ml-2">Kapoor's cafe</h4>
      </div>
      <VehiclePanel />
      <VehicleDetail />
      <LookingForADriver />

      <WaitingForADriver />
    </div>
  );
}

export default LocationSearchPanel