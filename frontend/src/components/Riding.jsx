import React, { useContext } from 'react'
import { VehicleDetailsContext } from '../context/VehicleContext';
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Riding = () => {
    
  return (
    <div className="h-screen">
      <Link to={"/home"}>
        <FaHome className="absolute w-8 h-8 top-3 right-3 bg-white" />
      </Link>
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
      <div className="h-[45%] bg-white absolute bottom-0 w-full">
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
            <button className="px-4 py-2 w-[45%] bg-green-500  rounded-lg text-white my-1">
              Go cashless
            </button>

            <button className="px-4 py-2 w-[45%] bg-yellow-500   rounded-lg text-white my-1 ">
              Pay Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Riding