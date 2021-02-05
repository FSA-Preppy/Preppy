
import Image from "./Image";
import { authService } from "../fbase";
import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

const Home = (props) => {
  const onClick = () => {
    authService.signOut();

  };

  return (
    <>
      <div>
        <Search history={props.history} />
      </div>
      <Link to="/auth">
        <button onClick={onClick}>Log Out</button>
      </Link>
    </>
  );
};

export default Home;
