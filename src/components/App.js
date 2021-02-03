import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return <>{init ? <Routes isLoggedIn={isLoggedIn} /> : "Loading..."}</>;
}

export default App;
