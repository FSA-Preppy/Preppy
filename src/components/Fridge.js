import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import "../styles/fridgestyle.css";
import { deleteIngredientThunk, addRecipeThunk } from "../store";
import { useHistory } from "react-router-dom";

const Fridge = (props) => {
  const { deleteIngredient, user, ingredients, addRecipes } = props;
  const [activeIng, setActiveIng] = useState([]);
  let history = useHistory()
  async function formatNames(activeIngredients) {
    let productList = [];
    let name = "";
    for (let i = 0; i < activeIngredients.length; i++) {
      name = activeIngredients[i].replaceAll(" ", "+");
      productList.push(name);
    }
    const output = await addRecipes(user, productList, history)
    console.log(output);
    if(output) setActiveIng([]);
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
            <ul className="fridge-box-area">
              <button disabled={!activeIng.length} onClick={() => formatNames(activeIng)}>
                Get Recipes!
              </button>
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
              {/* css animation boxes */}
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
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
    addRecipes: (userId, productList, history) =>
      dispatch(addRecipeThunk(userId, productList, history)),
  };
};

export default connect(mapState, mapDispatch)(Fridge);
