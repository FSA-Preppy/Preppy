import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
//You can also get the currently signed-in user by using the currentUser property. If a user isn't signed in, currentUser is null:
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";

const Routes = ({ isLoggedIn }) => {
  // console.log(authService.currentUser) this will return "null"

  return (
    <Router>
      {/* {isLoggedIn && <NavBar />} */}
      <Route exact path="/" component={LandingPage} />
      <Switch>
        {isLoggedIn && (
          <>
            <Route path="/">
              <Home />
              <NavBar />
            </Route>
          </>
        )}
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </Router>
  );
};

export default Routes;
