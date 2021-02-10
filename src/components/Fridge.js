import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/fridgestyle.css";
import { deleteIngredientThunk, addRecipeThunk} from "../store";

import axios from "axios";
import { dbService } from "../fbase";

const Fridge = (props) => {
  const {deleteIngredient, user, ingredients, addRecipes} = props;
  const [activeIng, setActiveIng] = useState([]);

  async function formatNames(activeIngredients) {
    let productList = [];
    let name = "";
    for (let i = 0; i < activeIngredients.length; i++) {
      name = activeIngredients[i].replaceAll(" ", "+");
      productList.push(name);
    }
    addRecipes(user, productList);
  }
  
  return (
    <>
      <div className="fridge-animation-area">
        <div className="fridge-header-container">
          <h1 className="fridge-title">FRIDGE</h1>
        </div>
        <div>
          <div>
            <button onClick={() => formatNames(activeIng)}>Get Recipes!</button>
            {ingredients.map((singleIngredient, idx) => (
              <Fragment key={idx}>
                <div>{singleIngredient}</div>
                {/* {activeIng.includes(singleIngredient) ? (
              <button
                onClick={setActiveIng(
                  activeIng.filter((item) => {
                    return item !== singleIngredient;
                  })
                )}
              >
                Remove from board
              </button>
            ) :  */}
                (
                <button
                  onClick={() => {
                    activeIng.push(singleIngredient);
                    window.alert(
                      `${singleIngredient} added to the recipe search!`
                    );
                    console.log(activeIng);
                  }}
                >
                  Add to board
                </button>
                )
                <button
                  onClick={() => {
                    deleteIngredient(user, singleIngredient);
                  }}
                >
                  delete
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        {/* css animation boxes */}
        {/* <ul className="fridge-box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    ingredients: state.ingredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteIngredient: (userId, ingredient) =>
      dispatch(deleteIngredientThunk(userId, ingredient)),
      addRecipes: (userId, productList) => dispatch(addRecipeThunk(userId, productList)),
  };
};

export default connect(mapState, mapDispatch)(Fridge);
