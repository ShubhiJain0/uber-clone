import React, { createContext, useState } from 'react'

export const CaptainContextData =createContext();

const CaptainContext = ({children}) => {
 const [CaptainAuth , setCaptainAuth]= useState(null);

 const [isLoading, setIsLoading] = useState(false);

 const [error , setError] = useState(null)

 const updateCaptain = (captainData) =>{
  setCaptainAuth(captainData);
 }

 const value = {
  CaptainAuth , 
  setCaptainAuth,
  isLoading,
  setIsLoading,
  error,
  setError,
  updateCaptain
 }

  return (
    <div>
      <CaptainContextData.Provider value={value}>
      {children}
      </CaptainContextData.Provider>
    </div>
  );
}

export default CaptainContext