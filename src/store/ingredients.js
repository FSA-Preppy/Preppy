import { dbService } from "../fbase";

const GET_INGREDIENTS = "GET_INGREDIENTS";
const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";
const SET_INGREDIENT = "SET_INGREDIENT";

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

const _setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  ingredient,
});

export const fetchIngredients = (userId) => {
  return async (dispatch) => {
    try {
      console.log("fetchThunk fired!!");
      const res = await dbService
        .collection("ingredients")
        .onSnapshot((snapshot) => {
          dispatch(
            getIngredients(
              snapshot.docs
                .filter((doc) => doc.data().creatorId === userId)
                .map((item) => item.data().name)
            )
          );
        });
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
    case SET_INGREDIENT:
      if (state.includes(action.ingredient)) {
        console.log(`STATE ALREADY INCLUDES ${action.ingredient}`);
        return state;
      } else {
        return [...state, action.ingredient];
      }
    default:
      return state;
  }
};
