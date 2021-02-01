import React, { useState, useEffect } from "react";
import Routes from "components/Routes";
import { authService } from "fbase";

function App() {

  /* authService.currentUser won't really determine whether or not user is logged in because Firebase does not have time to check if user is logged in...
  
  //App loads => authService.currentUser will be null beecause it happens so quickly.  if you use setInterval to see why. 
                                ***** TRY THIS *****
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
  console.log(authService.currentUser) 
  setInterval(() => {
    console.log(authService.currentUser)
  }, 2000) */
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setInit(true)
    })
  }, [])
  return (
    <>
      {init ? <Routes isLoggedIn ={isLoggedIn}/> : "Loading..."}
    </>
  );
}

export default App;
