import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./Auth";
//You can also get the currently signed-in user by using the currentUser property. If a user isn't signed in, currentUser is null:
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import Fridge from "./Fridge";
import Recipe from "./Recipe";
import Search from "./Search";

const Routes = ({ isLoggedIn }) => {
  return (
    <Router>
      <>
        {isLoggedIn ? (
          <>
            <Switch>
              <Route exact path="/fridge" component={Fridge} />
              <Route exact path="/recipe" component={Recipe} />
              <Route exact path="/search" component={Search} />
              <Redirect from="*" to="/fridge" component={Fridge} />
            </Switch>
            <NavBar />
          </>
        ) : (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/auth" component={Auth} />
            <Redirect from="*" to="/auth" component={Auth} />
          </Switch>
        )}
      </>
    </Router>
  );
};

export default Routes;
