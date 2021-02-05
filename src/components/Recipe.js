import React from "react";
import "../styles/recipestyle.css";

const Recipe = () => {
  return (
    <>
      <div id="header-container">
        <h1>Recipe Box</h1>
      </div>
      <div className="animation-area">
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
