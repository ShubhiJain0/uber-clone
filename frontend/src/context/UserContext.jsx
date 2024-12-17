import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

 const UserContext = ({children}) => {
  const [userAuth , setUserAuth] = useState({
    email: "",
    fullname : {
      firstname : "",
      lastname : ""
    }
  });

  
  return (
    <UserDataContext.Provider value={{userAuth , setUserAuth}}>
      {children}
    </UserDataContext.Provider>
  );
}

export default  UserContext;