import { auth } from "fbase";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
//You can also get the currently signed-in user by using the currentUser property. If a user isn't signed in, currentUser is null:
import { authService } from "fbase";
import Navigation from "./Navigation";

const Routes = ({ isLoggedIn }) => {
  // console.log(authService.currentUser) this will return "null"

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route>
            <Auth exact path="/" />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
