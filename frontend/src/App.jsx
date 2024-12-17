import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { Routes , Route } from 'react-router-dom'
import Start from './pages/Start'
import UserSignUp from './pages/UserSignUp'
import CaptainHome from './pages/CaptainHome'
import UserLogin from './pages/UserLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import CaptainLogin from './pages/CaptainLogin'
import { UserDataContext } from './context/UserContext'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedRoute'
import Riding from './components/Riding'
import VehicleContext from './context/VehicleContext'
import CaptainDetailContext from './context/CaptainDetailContext'

function App() {
 const {userAuth , setUserAuth}= useContext(UserDataContext);
//console.log(userAuth);
 
  return (
    <>
      <Routes>
        <Route path="/" index element={<Start />} />

        <Route path="/user-sign-up" index element={<UserSignUp />} />

        <Route path="/user-login" index element={<UserLogin />} />

        <Route path="/captain-sign-up" index element={<CaptainSignUp />} />

        <Route path="/captain-login" index element={<CaptainLogin />} />

        <Route
          path="/home"
          index
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user-logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrapper>
              <CaptainDetailContext>
                <CaptainHome />
              </CaptainDetailContext>
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/riding"
          element={
            <UserProtectedWrapper>
              <Riding />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App
