import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";
import axios from 'axios'
import { CaptainContextData } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";

const CaptainLogin = () => {
  
  const [email, setEmail] = useState("");

  const {captainAuth , setCaptainAuth} = useContext(CaptainContextData);

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      email: email,
      password: password,
    };
   const response = await axios.post(
     `${import.meta.env.VITE_BASE_URL}/captains/login`,

     captainData,
     { withCredentials: true }
   );

   if (response.status == 200) {
     const data = response.data;
     setCaptainAuth(data.captain);
     localStorage.setItem("token", data.token);
     navigate("/captain-home");
   }

   setEmail("");
   setPassword("");
  
    
    };
    console.log(captainAuth);
    
  return (
    <AnimationWrapper>
      <div className="p-7 flex justify-between h-screen flex-col">
        <div>
          <img
            className="my-5 w-[100px] ml-3 z-[2]"
            src="https://www.freepnglogos.com/uploads/uber-logo-transparent-3.png"
            alt="Uber Logo"
          />
          <form action="" onSubmit={handleSubmit}>
            <h3>What's your Email?</h3>

            <input
              required
              className="bg-[#eeeeee]
        mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3>Enter password</h3>
            <input
              className="bg-[#eeeeee]
        mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={
                (e)=>{
                  setPassword(e.target.value)
                }
              }
            />

            <button className="mb-7 rounded px-4 py-2 w-full text-lg bg-black text-white">
              Login
            </button>
          </form>
          <p className="text-center">
            Join a fleet?
            <Link
              to={"/captain-sign-up"}
              className="my-3 text-blue-600 underline underline-offset-2 ml-1"
            >
              Register as a captain
            </Link>
          </p>
        </div>

        <div>
          <Link
            to={"/user-login"}
            className=" block mb-7 rounded px-4 py-2 w-full text-lg bg-black text-white text-center"
          >
            Sign in as User
          </Link>
          <p></p>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default CaptainLogin;
