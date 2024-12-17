import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const UserProtectedWrapper = ({children}) => {

const {setUserAuth , userAuth}=  useContext(UserDataContext);

  const [ isLoading , setIsLoading] = useState(true);
  

 const token = localStorage.getItem("token");

  const navigate = useNavigate();

 useEffect(()=>{
  if (!token) {
    navigate("/");
  }
 }, [token])

   axios
     .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
       if (response.status == 200) {
         setUserAuth(response.data.user);
         setIsLoading(false);
       }
     })
     .catch((err) => {
       console.log(err);
       localStorage.removeItem("token");
       setIsLoading(false);
       navigate("/user-login");
     });

   if (isLoading) return <h1>Loading </h1>;


  return (
    <>{children}</>
  )
}

export default UserProtectedWrapper