import React, { createContext, useState } from 'react'

export const CaptainContextData =createContext();

const CaptainContext = ({children}) => {
 const [CaptainAuth , setCaptainAuth]= useState(null);

 const [isLoading, setIsLoading] = useState(false);

 const [error , setError] = useState(null)

 const updateCaptain = (captainData) =>{
  setCaptainAuth(captainData);
 }

 const [accept , setAccept] = useState(false);
 
  const [rideConfirm, setRideConfirm] = useState(false);

  const [destinationReached , setDestinationReached] = useState(false);

  const [capDesCor, setCapDesCor] = useState({})


  const [ride, setRide] = useState({destination : "",
      pickup: "",
      fare:0,
      _id:"",
      user: {
        fullname: {
          firstname: "",
          lastname:""
        }
      }
    })

 const value = {
   CaptainAuth,
   setCaptainAuth,
   isLoading,
   setIsLoading,
   error,
   setError,
   updateCaptain,
   capDesCor, setCapDesCor,
   accept,
   setAccept,
   rideConfirm,
   setRideConfirm,
   destinationReached,
   setDestinationReached,
   ride,
   setRide,
 };

  return (
    <div>
      <CaptainContextData.Provider value={value}>
      {children}
      </CaptainContextData.Provider>
    </div>
  );
}

export default CaptainContext