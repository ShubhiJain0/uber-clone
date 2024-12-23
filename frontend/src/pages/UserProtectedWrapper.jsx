import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const { setUserAuth } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserAuth(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setIsLoading(false);
        navigate("/user-login");
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUserAuth]);

  if (isLoading) return <h1>Loading...</h1>;

  return <>{children}</>;
};

export default UserProtectedWrapper;
