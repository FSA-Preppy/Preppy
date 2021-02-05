import { IfFirebaseAuthed } from "@react-firebase/auth";
import { dbService } from "../fbase";

const GET_INGREDIENTS = "GET_INGREDIENTS";
const EDIT_INGREDIENTS = "EDIT_INGREDIENTS";
const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";
const ADD_INGREDIENTS = "ADD_INGREDIENTS";

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
const editIngredients = (ingredients) => {
  return {
    type: EDIT_INGREDIENTS,
    ingredients,
  };
};

const deleteIngredients = (ingredients) => {
  return {
    type: DELETE_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredients = (userId) => {
  return async (dispatch) => {
    try {
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
      const str = `${ingredient} has been added`
      window.confirm(str)
      const res = await dbService.collection("ingredients").add({
        name: ingredient,
        createdAt: Date.now(),
        creatorId: userId,
      });
    } catch (err) {
      console.error(err.message);
    }
  };
};
export const deleteIngredientThunk = (userId, ingredient) => {
  return async (dispatch) => {
    try {
       await dbService
        .collection("ingredients")
        .onSnapshot((snapshot) => {
          snapshot.docs.filter(
            (doc) =>
              doc.data().creatorId === userId && doc.data().name === ingredient
          ).map(item => {
            dbService.doc(`ingredients/${item.id}`).delete();
          })
        });
    } catch (err) {
      console.error(err.message);
    }
  };
};
export const editIngredientThunk = (userId, ingredient, newName) => {
  return async (dispatch) => {
    try {
       await dbService
        .collection("ingredients")
        .onSnapshot((snapshot) => {
          snapshot.docs.filter(
            (doc) =>
              doc.data().creatorId === userId && doc.data().name === ingredient
          ).map(item => {
            dbService.doc(`ingredients/${item.id}`).update({
              name: newName
            });
          })
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
    default:
      return state;
  }
};
