import React, { useContext, useEffect, useState } from "react";

import { CaptainContextData } from "../context/CaptainContext";


import axios from "axios";

import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");

  const {captainAuth , setCaptainAuth} = useContext(CaptainContextData);

  const navigate = useNavigate();

  const [ isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token]);

  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then(response =>{
    if(response.status ==200){
      setCaptainAuth(response.data.captain)
      setIsLoading(false);
    }
  }).catch(err=>{
    console.log(err);
    localStorage.removeItem('token')
    setIsLoading(false);
    navigate('/captain-login')
    
  })

  if(isLoading) return( <h1>Loading </h1>)

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
