import React, { createContext, useContext, useState } from 'react'

export const VehicleDetailsContext= createContext();

const VehicleContext = ({children}) => {
  const apple = "apple"
  
   const [isAnimating, setIsAnimating] = useState(false);

   const [vehiclePanelDetail, setVehiclePanelDetail] = useState("");

   
     const [detailAnimation, setDetailAnimation] = useState(false);

     
       const [confirmRide ,setConfirmRide] = useState(false);

       
         const [waitForDriver, setWaitForDriver] = useState(false)

    const [ Riding , setRiding] = useState(true);
   

  return (
    <VehicleDetailsContext.Provider
      value={{
        isAnimating,
        setIsAnimating,
        vehiclePanelDetail,
        setVehiclePanelDetail,
        detailAnimation,
        setDetailAnimation,
        confirmRide ,setConfirmRide,
        waitForDriver, setWaitForDriver,
        Riding,setRiding,
        apple,
      }}
    >
      {children}
    </VehicleDetailsContext.Provider>
  );
}

export default VehicleContext