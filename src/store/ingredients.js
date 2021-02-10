import { dbService } from "../fbase";

const GET_INGREDIENTS = "GET_INGREDIENTS";
const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";
const REMOVE_INGREDIENTS = "REMOVE_INGREDIENTS";

const getIngredients = (ingredients) => {
  return {
    type: GET_INGREDIENTS,
    ingredients,
  };
};
const addIngredients = (ingredient) => {
  return {
    type: ADD_INGREDIENTS,
    ingredient,
  };
};

const deleteIngredients = (ingredients) => {
  return {
    type: DELETE_INGREDIENTS,
    ingredients,
  };
};

export const removeIngredients = () => {
  return {
    type: REMOVE_INGREDIENTS,
  };
};

export const fetchIngredients = (userId) => {
  return async (dispatch) => {
    try {
      console.log("fetchThunk fired!!");

      const res = await dbService.collection("ingredients").get();
      let array = [];

      res.forEach((doc) => {
        if (doc.data().creatorId === userId) {
          array.push(doc.data().name);
        }
      });
      dispatch(getIngredients(array));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const addIngredientThunk = (userId, ingredient) => {
  return async (dispatch) => {
    try {
      console.log("addthunk fired!");
      const str = `${ingredient} has been added`;
      window.confirm(str);
      const res = await dbService.collection("ingredients").add({
        name: ingredient,
        createdAt: Date.now(),
        creatorId: userId,
      });
      console.log("ingredient-->", ingredient);
      dispatch(addIngredients(ingredient));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const deleteIngredientThunk = (userId, ingredient) => {
  return async (dispatch) => {
    try {
      console.log("deleteThunk fired");
      await dbService.collection("ingredients").onSnapshot((snapshot) => {
        snapshot.docs
          .filter(
            (doc) =>
              doc.data().creatorId === userId && doc.data().name === ingredient
          )
          .map((item) => {
            dbService.doc(`ingredients/${item.id}`).delete();
          });
      });
      dispatch(deleteIngredients(ingredient));
    } catch (err) {
      console.error(err.message);
    }
  };
};

let initialState = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
    case ADD_INGREDIENTS:
      return [...state, action.ingredient];
    case DELETE_INGREDIENTS:
      return state.filter((item) => item !== action.ingredients);
    case REMOVE_INGREDIENTS:
      return [];
    default:
      return state;
  }
};

