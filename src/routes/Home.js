import Image from 'components/Image';
import { authService } from 'fbase';
import React from 'react';
// import { useHistory } from "react-router";
import Search from '../components/Search';

const Home = () => {
  // const history =useHistory
  const onClick = () => {
    authService.signOut();
    // history.push("/")
  };
  return (
    <>
      <div>
        <Image />
      </div>
      <div>
        <Search />
      </div>
      <button onClick={onClick}>Log Out</button>
    </>
  );
};

export default Home;
