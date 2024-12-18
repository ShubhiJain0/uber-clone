import React, { useContext, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import {motion} from 'framer-motion'
import VehiclePanel from './VehiclePanel';
import WaitingForADriver from './WaitingForADriver';
import VehicleDetail from './VehicleDetail';
import LookingForADriver from './LookingForADriver';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
const LocationSearchPanel = ({
  suggestions = [],
  setPickUp,
  pickup, destination,
  setDestination,
  activeField,
  setisAnimating2,
}) => {
  const { isAnimating, setIsAnimating } = useContext(UserDataContext);

  const { fare , setFare} = useContext(UserDataContext)

  const handleAnimation = () => {
    setIsAnimating(true);
    // setisAnimating2(false)
  };

  return (
    <div>
      <button
        className="bg-black text-white px-4 py-2 rounded-xl"
        onClick={async () => {
          setTimeout(() => {
            handleAnimation();
            setisAnimating2(false);
          }, 500);

          // const response = await axios.get(
          //   `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          //   {
          //     params: { pickup, destination },
          //     headers: {
          //       Authorization: `Bearer ${localStorage.getItem("token")}`,
          //     },
          //   }
          // );
          // console.log(response.data);
          // await setFare(response.data);
        }}
      >
        Find Rides for me
      </button>

      {/* for test purpose */}
      <div
        className="flex items-center justify-start p-4 border overflow-hidden border-grey-500 active:border-black my-4"
        
      >
        <h2 className="bg-[#eee] p-2 rounded-full flex justify-center items-center ">
          <FaLocationDot />
        </h2>
        <h4 className="ml-2">suggestion.description</h4>
      </div>

      {suggestions.map((suggestion, index) => (
        <div
          className="flex items-center justify-start p-4 border overflow-hidden border-grey-500 active:border-black my-4"
          key={index}
          onClick={async () => {
            activeField === "pickup"
              ? setPickUp(suggestion.description)
              : setDestination(suggestion.description);
          }}
        >
          <h2 className="bg-[#eee] p-2 rounded-full flex justify-center items-center ">
            <FaLocationDot />
          </h2>
          <h4 className="ml-2">{suggestion.description}</h4>
        </div>
      ))}

      <VehiclePanel fare={fare} />
      <VehicleDetail />
      <LookingForADriver />

      <WaitingForADriver />
    </div>
  );
};

export default LocationSearchPanel