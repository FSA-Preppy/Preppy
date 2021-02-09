import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/fridgestyle.css";
import { deleteIngredientThunk } from "../store";

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
    //replace with thunk call to fetch recipes
    try {
      const { data } = await axios.get(fullQuery);
      console.log(data.hits[0].recipe);
      // console.log(data.hits[0].recipe.image);
      // console.log(data.hits[0].recipe.url);
      // console.log(data.hits[0].recipe.label);

      let recipeImage = "";
      let recipeUrl = "";
      let recipeLabel = "";
      for (let i = 0; i < data.hits.length; i++) {
        //console.log('fore loop');
        console.log(data.hits[i]);
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

      //console.log(data.hits.)

      window.confirm(`Fetching Recipes including: ${productList}`);
    } catch (err) {
      console.error(err.message);
    }
    //setRecipes([...recipes, data]);
    //dbService.collection('ingredients').add

    //replace with thunk call to push returned recipes to user DB
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
  };
};

export default connect(mapState, mapDispatch)(Fridge);
