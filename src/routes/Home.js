import Image from "components/Image";
import { authService } from "fbase";
import React from "react";
// import { useHistory } from "react-router";

const Home = () => {
    // const history =useHistory
  const onClick = () => {
    authService.signOut();
    // history.push("/")
  };
  return (
    <>
    <div><Image /></div>
      <button onClick={onClick}>Log Out</button>
    </>
  );
};

export default Home;
