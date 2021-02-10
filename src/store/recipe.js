import axios from "axios";
import { dbService } from "../fbase";

const GET_RECIPE = "GET_RECIPE";
const ADD_RECIPE = "ADD_RECIPE";

const getRecipe = (recipes) => {
  return {
    type: GET_RECIPE,
    recipes,
  };
};

const addRecipe = (recipes) => {
  return {
    type: ADD_RECIPE,
    recipes,
  };
};
export const fetchRecipe = (userId) => {
  return async (dispatch) => {
    try {
      console.log("recipeThunk fired!!");

      const res = await dbService.collection("recipes").get();
      let array = [];

      res.forEach((doc) => {
        if (doc.data().creatorId === userId) {
          array.push(doc.data());
        }
      });
      dispatch(getRecipe(array));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export const addRecipeThunk = (userId, productList) => {
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
  return async (dispatch) => {
    try {
      const { data } = await axios.get(fullQuery);
      console.log(data.hits[0].recipe);

      let recipeImage = "";
      let recipeUrl = "";
      let recipeLabel = "";
      for (let i = 0; i < data.hits.length; i++) {
        console.log(data.hits[i]);
        recipeImage = data.hits[i].recipe.image;
        recipeUrl = data.hits[i].recipe.url;
        recipeLabel = data.hits[i].recipe.label;

        await dbService.collection("recipes").add({
          name: recipeLabel,
          image: recipeImage,
          url: recipeUrl,
          createdAt: Date.now(),
          creatorId: userId,
        });
      }
      window.confirm(`Fetching Recipes including: ${productList}`);
      dispatch(addRecipe(productList));
    } catch (err) {
      console.error(err.message);
    }
  };
};

let initialState = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE:
      return action.recipes;
    case ADD_RECIPE:
      return [...state, action.recipes];
    default:
      return state;
  }
};
