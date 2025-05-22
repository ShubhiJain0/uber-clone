
import React, { useContext, useState } from "react";
import AnimationWrapper from "../components/AnimationWrapper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";

const UserSignUp = () => {

  const navigate = useNavigate();

  const {userAuth , setUserAuth}=useContext(UserDataContext);

  const [email, setEmail] = useState("");

  const [CaptainData, setCaptainData] = useState({
    email:"",
    password: "",
    fullname: {
      firstName:"",
      lastName: "",
    },
  });

  const [password, setPassword] = useState("");

  const [ firstName , setFirstName] = useState("");

  
  const [lastName, setLastName] = useState("");
  
  const handleSubmit =async  (e) => {
    e.preventDefault();

  const newUser = {
      email: email,
      password: password,
      fullname :{
        firstname : firstName,
        lastname: lastName
      }
    };

    

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,

      newUser,
      { withCredentials: true }
    );

    if(response.status ===201){
      const data = response.data;
       setUserAuth(data.user);
         localStorage.setItem("token", data.token);
      navigate("/home")
    }


    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

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
            <h3>What's your name?</h3>

            <div className="flex space-x-3 my-4">
              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="first name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <input
                required
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <h3>Enter Email</h3>

            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="mb-7 rounded px-4 py-2 w-full text-lg bg-black text-white">
              Sign up
            </button>
          </form>
          <p className="text-center">
            Already have an Account?
            <Link
              to={"/user-login"}
              className="my-3 text-blue-600 underline underline-offset-2 ml-1"
            >
              Login
            </Link>
          </p>
        </div>

        <div>
          <Link
            to={"/captain-sign-up"}
            className=" block mb-7 rounded px-4 py-2 w-full text-lg bg-black text-white text-center"
          >
            Sign up as captain
          </Link>
          
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default UserSignUp;

