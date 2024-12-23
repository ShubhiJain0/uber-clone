import React, { createContext, useEffect } from 'react'
import {io} from 'socket.io-client'
export const SocketContextData = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({children}) => {

  useEffect(()=>{
      
    socket.on("connect" , ()=>{
        console.log("Connected to server");
      })

      socket.on("disconnect" , ()=>{
        console.log("Disconnected from server");
      })
    
  }, [])

  const sendMessage = (eventName , message)=>{
    socket.emit(eventName , message);
  }

  const receiveMessage = (eventName , callback)=>{
    socket.on(eventName , callback)
  }
  return <SocketContextData.Provider value={{receiveMessage , sendMessage , socket}}>{children}</SocketContextData.Provider>;
}

export default SocketContext