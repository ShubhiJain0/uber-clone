import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

 const UserContext = ({children}) => {
  const [userAuth , setUserAuth] = useState({
    email: "",
    fullname : {
      firstname : "",
      lastname : ""
    }
  });

  const [waitingForDriverData, setWaitingForDriverData] = useState({
    captain: {
      fullname: {
        firstname: "",
        lastname: "",
      },

      vehicle: {
        color:"",
        plate:"",
        capacity:0
      },
    },
  });
  

     const [isAnimating, setIsAnimating] = useState(false);
  
     const [vehiclePanelDetail, setVehiclePanelDetail] = useState("");
  
     
       const [detailAnimation, setDetailAnimation] = useState(false);
  
       
         const [confirmRide ,setConfirmRide] = useState(false);
  
         
           const [waitForDriver, setWaitForDriver] = useState(false)
  
      const [ Riding , setRiding] = useState(true);

      
        const [ fare , setFare] = useState({})

        const [pickup , setPickUp]=  useState(""); 
        
        
        const [destination, setDestination] = useState("");

        const [destinationCoordinates , setDestinationCoordinates] = useState({})

        const [userOtp , setUserOtp] = useState("");

        const [userDesCor , setUserDesCor] = useState({});
          
  return (
    <UserDataContext.Provider
      value={{
        userDesCor , setUserDesCor,
        userAuth,
        setUserAuth,
        isAnimating,
        setIsAnimating,
        vehiclePanelDetail,
        setVehiclePanelDetail,
        detailAnimation,
        setDetailAnimation,
        confirmRide,
        setConfirmRide,
        waitForDriver,
        setWaitForDriver,
        Riding,
        setRiding,
        fare,
        setFare,
        pickup,
        setPickUp,
        destination,
        setDestination,
        userOtp,
        setUserOtp,
        waitingForDriverData,
        setWaitingForDriverData,
        destinationCoordinates,
        setDestinationCoordinates,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default  UserContext;