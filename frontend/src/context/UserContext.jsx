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

  
     const [isAnimating, setIsAnimating] = useState(false);
  
     const [vehiclePanelDetail, setVehiclePanelDetail] = useState("");
  
     
       const [detailAnimation, setDetailAnimation] = useState(false);
  
       
         const [confirmRide ,setConfirmRide] = useState(false);
  
         
           const [waitForDriver, setWaitForDriver] = useState(false)
  
      const [ Riding , setRiding] = useState(true);

  return (
    <UserDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default  UserContext;