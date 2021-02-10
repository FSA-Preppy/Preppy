import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import "../styles/fridgestyle.css";
import { deleteIngredientThunk, fetchIngredients } from "../store";

import axios from "axios";
import { dbService } from "../fbase";

const Fridge = (props) => {
  const { deleteIngredient, user, ingredients } = props;
  const [activeIng, setActiveIng] = useState([]);

  async function formatNames(activeIngredients) {
    let productList = [];
    let name = "";
    for (let i = 0; i < activeIngredients.length; i++) {
      name = activeIngredients[i].replaceAll(" ", "+");
      productList.push(name);
    }
    getRecipe(productList);
  }

  async function getRecipe(productList) {
    let fullQuery = "";
    let searchPrefix = `https://api.edamam.com/search?`;
    let searchAppend = "";
    let searchKeys = `app_id=ee8d7e3a&app_key=f2876f55d65442e23c22ec308974a5f7&from=0&to=4`;

    for (let i = 0; i < productList.length; i++) {
      searchAppend += `q=${productList[i]}&`;
    }
    fullQuery = searchPrefix + searchAppend + searchKeys;
    console.log(
      `fetching recipes including: ` + productList + productList.length
    );
    try {
      const { data } = await axios.get(fullQuery);
      let recipeImage = "";
      let recipeUrl = "";
      let recipeLabel = "";
      for (let i = 0; i < data.hits.length; i++) {
        recipeImage = data.hits[i].recipe.image;
        recipeUrl = data.hits[i].recipe.url;
        recipeLabel = data.hits[i].recipe.label;
        await dbService.collection("recipes").add({
          name: recipeLabel,
          image: recipeImage,
          url: recipeUrl,
          createdAt: Date.now(),
          creatorId: user,
        });
      }
      window.confirm(`Fetching Recipes including: ${productList}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  const settingActiveIng = (singleIngredient) => {
    setActiveIng([...activeIng, singleIngredient]);
  };

  const removeActiveIng = (singleIngredient) => {
    setActiveIng(activeIng.filter((item) => item !== singleIngredient));
  };

  return (
    <>
      <div className="fridge-animation-area">
        <div className="fridge-header-container">
          <h1 className="fridge-title">FRIDGE</h1>
        </div>
        <div>
          <div>
            <button onClick={() => formatNames(activeIng)}>Get Recipes!</button>
            <div></div>
            {ingredients.map((singleIngredient, idx) => {
              return (
                <Fragment key={idx}>
                  <div>{singleIngredient}</div>
                  {activeIng.includes(singleIngredient) ? (
                    <button onClick={() => removeActiveIng(singleIngredient)}>
                      Remove from board
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        settingActiveIng(singleIngredient);
                      }}
                    >
                      Add to board
                    </button>
                  )}
                  <button
                    onClick={() => {
                      removeActiveIng(singleIngredient);
                      deleteIngredient(user, singleIngredient);
                    }}
                  >
                    delete
                  </button>
                </Fragment>
              );
            })}
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
    getIngredients: (userId) => dispatch(fetchIngredients(userId)),
  };
};

export default connect(mapState, mapDispatch)(Fridge);
