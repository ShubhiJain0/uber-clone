import React, { useContext, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import {motion} from 'framer-motion'
import VehiclePanel from './VehiclePanel';
import WaitingForADriver from './WaitingForADriver';
import VehicleDetail from './VehicleDetail';
import LookingForADriver from './LookingForADriver';
import { UserDataContext } from '../context/UserContext';
const LocationSearchPanel = () => {


 const { isAnimating, setIsAnimating } = useContext(UserDataContext);

  const handleAnimation =()=>{
      setIsAnimating(true);
  }
  

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