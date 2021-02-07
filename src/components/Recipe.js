import React from "react";
import "../styles/recipestyle.css";

const Recipe = () => {
  return (
    <>
      <div className="animation-area">
        <div className="header-container">
          <h1 className="title">RECIPES</h1>
        </div>
        <div>
          <p>LIST OF RECIPES GOES HERE</p>
        </div>
        <ul className="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Recipe;
