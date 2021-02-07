import Image from "./Image";
import React from "react";
import Search from "./Search";

const Home = (props) => {
  return (
    <>
      <div>
        <Search history={props.history} />
      </div>
    </>
  );
};

export default Home;
