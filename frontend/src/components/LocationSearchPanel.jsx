import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import {motion} from 'framer-motion'
import VehiclePanel from './vehiclePanel';

import VehicleDetail from './VehicleDetail';
import LookingForADriver from './LookingForADriver';
const LocationSearchPanel = () => {


 const [isAnimating, setIsAnimating] = useState(false);

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
      <VehiclePanel
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
      
    </div>
  );
}

export default LocationSearchPanel