import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token exists, redirect to home
      navigate("/");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err.message);
      });
  }, [navigate]); // Dependency array ensures useEffect runs once on mount

  return <div>UserLogout</div>;
};

export default UserLogout;
