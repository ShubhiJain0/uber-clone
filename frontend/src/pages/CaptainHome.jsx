import React, { useContext, useEffect, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { IoCashOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { IoSpeedometerOutline } from "react-icons/io5";
import { CaptainContextData } from "../context/CaptainContext";
import AcceptRide from "../components/AcceptRide";
import ConfirmRide from "../components/ConfirmRide";
import Destination from "../components/Destination";
import { SocketContextData } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import RouteMap from "../components/RouteMap";
import axios from "axios";
const CaptainHome = () => {
  const [ ridedestination, setRidedestination ] = useState({});

  const {capDesCor, setCapDesCor} = useContext(CaptainContextData)

  const { accept, setAccept, CaptainAuth } = useContext(CaptainContextData);
  const { receiveMessage, sendMessage, socket } = useContext(SocketContextData);

  //console.log(CaptainAuth);
  

  const {ride, setRide} = useContext(CaptainContextData)

  useEffect(() => {

    sendMessage("join", { userType: "captain", userId: CaptainAuth._id })

    const updateLocation = ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) =>{
          sendMessage("update-location-captain" , {
            userId: CaptainAuth._id,
            location: {
              ltd : position.coords.latitude,
            lng: position.coords.longitude
            }
          })
        // console.log({
        //   userId: CaptainAuth._id,
        //   location: {
        //     ltd: position.coords.latitude,
        //     lng: position.coords.longitude,
        //   },
        // });
        
        }
        );
      }
    }

const locationInterval =    setInterval(
    updateLocation
    , 10000)
    
    return ()=>clearInterval(locationInterval)

  }, [CaptainAuth]);

   socket.on("new-ride", (data) => {
     console.log(data);
     setRide(data)
     setRidedestination(data.destination)
     if(ridedestination){
      fetchCoordinates(data.destination);
     }
     setAccept(true)
   });

   console.log(ridedestination);
       const fetchCoordinates = async (address) => {
         try {
           const response = await axios.get(
             `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates-captain`,
             
             {withCredentials: true,
               params: { address },
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
             }
           );
           console.log(response.data);
           setCapDesCor(response.data)
         } catch (error) {
           console.error("Error fetching coordinates:", error);
         }
       };
      
      
  return (
    <div className="h-screen overflow-hidden">
      <Link
        to={"/home"}
        className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full"
      >
        <FaSignOutAlt className=" w-8 h-8  " />
      </Link>
      <img
        className="my-1 w-[70px] absolute left-3 top-3"
        src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
        alt=""
      />
      <div className="w-screen h-[65%]">
        {/* image for temporary use */}
        <RouteMap desCor={capDesCor} />
        <div className="object-cover w-full h-full"></div>
        {/* <img
          src="https://cdn-images-1.medium.com/max/1600/1*mleHgMCGD-A1XXa2XvkiWg.png"
          className="object-cover w-full h-full"
          alt=""
        /> */}
      </div>
      <div className="h-[35%] absolute bottom-0 bg-white w-full">
        <div className="flex border border-grey-400 active:border-black justify-center flex-col items-center w-full p-3">
          <div className="w-full">
            <div className="flex items-center gap-5 border-b p-3">
              <img
                src="https://up.yimg.com/ib/th?id=OIP.59hYtOrco0EZe3thkO8j1AHaE7&pid=Api&rs=1&c=1&qlt=95&w=173&h=115"
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <div>
                <h3 className="text-lg font-medium">Harsh patel</h3>
                <p className="text-base text-gray-600">
                  Kankariya talab , bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center justify-around  p-5 bg-orange-400 rounded-xl">
              <div className="flex flex-col items-center">
                <LuNotebookPen className="w-6 h-6" />
                <h5>10.2</h5>
                <p>Hours online</p>
              </div>
              <div className="flex flex-col items-center">
                <IoSpeedometerOutline className="w-6 h-6" />
                <h5>10.2</h5>
                <p>Hours online</p>
              </div>
              <div className="flex flex-col items-center">
                <IoMdTime className="w-6 h-6" />
                <h5>10.2</h5>
                <p>Hours online</p>
              </div>
            </div>
            <button
              className="px-4 py-2 w-[45%] bg-green-500  rounded-lg text-white my-1"
              onClick={() => {
                setAccept(true);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      <AcceptRide ride={ride} captainId={CaptainAuth._id} />
      <ConfirmRide />
      <Destination />
    </div>
  );
};

export default CaptainHome;
