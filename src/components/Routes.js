import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
//You can also get the currently signed-in user by using the currentUser property. If a user isn't signed in, currentUser is null:
import NavBar from "./NavBar";

const Routes = ({ isLoggedIn }) => {
  // console.log(authService.currentUser) this will return "null"

  return (
    <Router>
      {isLoggedIn && <NavBar />}
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
