import React, { useContext, useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import LocationSearchPanel from '../components/LocationSearchPanel';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import VehicleContext from '../context/VehicleContext';
import axios from 'axios'
import { UserDataContext } from '../context/UserContext';
import { SocketContextData } from '../context/SocketContext';
import RouteMap from '../components/RouteMap';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const { receiveMessage, sendMessage, socket } = useContext(SocketContextData);

  const {setUserAuth , userAuth}=  useContext(UserDataContext);

const {pickup , setPickUp}=  useContext(UserDataContext)
 
const [isAnimating, setisAnimating] = useState(false)

const handleAnimation = ()=>{
  setisAnimating(true)
}

const {waitingForDriverData , setWaitingForDriverData} = useContext(UserDataContext)



  const { detailAnimation, setDetailAnimation } = useContext(UserDataContext);
 
  const { waitForDriver, setWaitForDriver} = useContext(UserDataContext);
 

  const { confirmRide, setConfirmRide } = useContext(UserDataContext);


const { destination, setDestination, userDesCor} =
  useContext(UserDataContext);

const [ pickUpSuggestions , setPickUpSuggestions] = useState([]);

const [ destinationSuggestions , setDestinationSuggestions ] = useState();

const [ activeField , setActiveFiled] = useState("");

  const submitHandler=(e)=>{
      e.preventDefault(); 
  }
  

  const handlePickUp= async (e)=>{
    setPickUp(e.target.value);
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          { withCredentials: true },
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
            
            setPickUpSuggestions(response.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleDestination = async (e)=>{
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        { withCredentials: true },
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDestinationSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: userAuth._id });

    socket.on("ride-confirmed" , (data)=>{console.log(data)
      setConfirmRide(false)
      setDetailAnimation(false) 
      setWaitForDriver(true)
      setWaitingForDriverData(data);
    });
  }, [userAuth]);

  socket.on('ride-started' , ride=>{
    console.log(ride);
    navigate("/riding")
  })
      
  return (
    <div className="h-screen relative z-[1]">
      <img
        className="my-1 w-[70px] absolute left-3 top-3"
        src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
        alt=""
      />
      <div className="w-screen h-screen">
        {/* image for temporary use */}

        <div className="object-cover w-full h-full">
          <RouteMap desCor={userDesCor} />
        </div>
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
                handlePickUp(e);
                setActiveFiled("pickup");
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
                handleDestination(e);

                setActiveFiled("destination");
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
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickUpSuggestions
                : destinationSuggestions
            }
            setPickUp={setPickUp}
            setDestination={setDestination}
            activeField={activeField}
            setisAnimating2={setisAnimating}
            pickup={pickup}
            destination={destination}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home