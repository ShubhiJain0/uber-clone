import React, { createContext, useState } from 'react'

export const CaptainRideDetailContext = createContext();

const CaptainDetailContext = ({children}) => {
 const [accept , setAccept] = useState(false);

 const [rideConfirm, setRideConfirm] = useState(false);

  return (
    <CaptainRideDetailContext.Provider
      value={{ accept, setAccept, rideConfirm, setRideConfirm }}
    >
      {children}
    </CaptainRideDetailContext.Provider>
  );
}

export default CaptainDetailContext