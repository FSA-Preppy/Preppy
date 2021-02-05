import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Edit from "./Edit";
import {
  addIngredientThunk,
  deleteIngredientThunk,
  fetchIngredients,
} from "../store";

const Fridge = (props) => {
  const { getIngredients, deleteIngredient, user, ingredients } = props;

  useEffect(() => {
    getIngredients(user);
  }, []);

  return (
    <>
      <div>
        {ingredients.map((singleIngredient) => (
          <>
            <div>{singleIngredient}</div>
            <button
              onClick={() => {
                deleteIngredient(user, singleIngredient);
              }}
            >
              delete
            </button>
            <Link
              to={`/fridge/${singleIngredient}/edit`}
            >
              edit
            </Link>
          </>
        ))}
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
    getIngredients: (userId) => dispatch(fetchIngredients(userId)),
    addIngredient: (userId, ingredient) =>
      dispatch(addIngredientThunk(userId, ingredient)),
    deleteIngredient: (userId, ingredient) =>
      dispatch(deleteIngredientThunk(userId, ingredient)),
  };
};

export default connect(mapState, mapDispatch)(Fridge);
