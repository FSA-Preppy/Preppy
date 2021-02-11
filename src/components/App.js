import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import { authService } from '../fbase';
import { connect } from 'react-redux';
import { setUser, fetchIngredients } from '../store';

function App(props) {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUser, getIngredients } = props;

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user.uid);
        getIngredients(user.uid);
      } else setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return <>{init ? <Routes isLoggedIn={isLoggedIn} /> : null}</>;
}

const mapState = (state) => {
  return {
    user: state.user,
    ingredients: state.ingredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getIngredients: (userId) => dispatch(fetchIngredients(userId)),
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapState, mapDispatch)(App);
