import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addIngredientThunk,
  deleteIngredientThunk,
  fetchIngredients,
  editIngredientThunk,
} from "../store";
import ingredients from "../store/ingredients";
import { useHistory } from "react-router-dom";

const Edit = (props) => {
  let history = useHistory();

  console.log("params--->", props.match.params.name);
  const { getIngredients, user, editIngredient } = props;
  const [newName, setNewName] = useState(props.match.params.name);
  useEffect(() => {
    getIngredients(user);
  }, []);

  const onChange = (evt) => {
    const {
      target: { value },
    } = evt;
    setNewName(value);
  };
  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let confirmed = window.confirm("item has changed!");

      if (confirmed) {
        await editIngredient(user, props.match.params.name, newName);
        history.push("/fridge");
        confirmed = false;
      } else {
        history.push("/fridge");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>{newName}</div>
        <input
          type="text"
          placeholder="food name here"
          value={newName}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
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
    editIngredient: (userId, ingredient, newName) =>
      dispatch(editIngredientThunk(userId, ingredient, newName)),
  };
};

export default connect(mapState, mapDispatch)(Edit);
