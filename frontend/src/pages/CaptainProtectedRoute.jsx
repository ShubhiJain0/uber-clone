import React, { useContext, useEffect, useState } from "react";
import { CaptainContextData } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { captainAuth, setCaptainAuth } = useContext(CaptainContextData);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if no token
    if (!token) {
      navigate("/captain-login");
      return;
    }

    // Fetch captain profile
    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.captain);
          
          
          setCaptainAuth(response.data.captain);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptainAuth]);

  if (isLoading) return <h1>Loading...</h1>;

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
