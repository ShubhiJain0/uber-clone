import React, { useContext, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import LocationSearchPanel from '../components/LocationSearchPanel';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import VehicleContext from '../context/VehicleContext';
const Home = () => {

const [pickup , setPickUp]=  useState();

 
 
const [isAnimating, setisAnimating] = useState(false)

const handleAnimation = ()=>{
  setisAnimating(true)
  
  
}

const [destination, setDestination] = useState();

  const submitHandler=(e)=>{
      e.preventDefault(); 
  }




  return (
    <div className="h-screen relative z-[1]">
      <img
        className="my-1 w-[70px] absolute left-3 top-3"
        src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
        alt=""
      />
      <div className="w-screen h-screen">
        {/* image for temporary use */}
        <img
          src="https://cdn-images-1.medium.com/max/1600/1*mleHgMCGD-A1XXa2XvkiWg.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
      <motion.div
        className=" absolute h-screen w-full top-0 flex flex-col z-[2] justify-end"
        initial={{ y: 0 }}
        animate={isAnimating ? { y: "1%" } : { y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="h-[30%] bg-white p-5 relative">
          <div className="flex justify-between">
            <h5 className="text-2xl font-semibold ">Find a trip</h5>
            {isAnimating ? (
              <IoIosArrowDown
                className="inline-block"
                onClick={() => {
                  setisAnimating(false);
                }}
              />
            ) : (
              <IoIosArrowUp
                className="inline-block"
                onClick={() => {
                  setisAnimating(true);
                }}
              />
            )}
          </div>

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-[1px] top-[40%] bg-gray-800  rounded-full left-9"></div>
            <input
              type="text"
              placeholder="add pick up location"
              className="bg-[#eee] px-12 py-2 text-md rounded-lg my-3 w-full"
              value={pickup}
              onChange={(e) => {
                setPickUp(e.target.value);
              }}
              onFocus={() => {
                handleAnimation();
              }}
            />
            <input
              type="text"
              placeholder="Enter destination"
              className="bg-[#eee] px-12 py-2 text-md rounded-lg w-full"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onFocus={() => {
                handleAnimation();
              }}
            />
          </form>
        </div>

        <motion.div
          className="bg-white overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isAnimating ? "70%" : 0 }}
          transition={{ duration: 0.4 }}
        >
          <VehicleContext>
            <LocationSearchPanel />
          </VehicleContext>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home