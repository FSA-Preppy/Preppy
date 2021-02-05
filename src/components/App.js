import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { authService } from "../fbase";
import { connect } from "react-redux";
import { setUser } from "../store";

function App(props) {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        props.setUser(user.uid);
      } else setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return <>{init ? <Routes isLoggedIn={isLoggedIn} /> : null}</>;
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapState, mapDispatch)(App);
