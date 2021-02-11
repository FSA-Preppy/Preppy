import axios from 'axios';
import { recipeAPIKey } from '../config/edamamAPI';

const GET_RECIPES = 'GET_RECIPES';
const REMOVE_RECIPES = 'REMOVE_RECIPES';

const getRecipe = (recipes) => {
  return {
    type: GET_RECIPES,
    recipes,
  };
};

export const removeRecipes = () => ({ type: REMOVE_RECIPES });

export const addRecipeThunk = (userId, productList, history) => {
  return async (dispatch) => {
    try {
      let fullQuery = '';
      let searchPrefix = `https://api.edamam.com/search?q=`;
      let searchAppend = '';
      let searchKeys = `&app_id=ee8d7e3a&app_key=${recipeAPIKey}&from=0&to=4`;

      for (let i = 0; i < productList.length; i++) {
        searchAppend += `${productList[i]}+`;
      }

      fullQuery = searchPrefix + searchAppend + searchKeys;

      console.log(
        `fetching recipes including: ` + productList + productList.length
      );
      const { data } = await axios.get(fullQuery);
      if (data.hits.length === 0) {
        alert('No recipes are found. Please use other ingredients');
        return true;
      }
      let array = [];

      for (let i = 0; i < data.hits.length; i++) {
        array.push({
          id: i,
          image: data.hits[i].recipe.image,
          url: data.hits[i].recipe.url,
          name: data.hits[i].recipe.label,
          createdAt: Date.now(),
          creatorId: userId,
        });
      }
      dispatch(getRecipe(array));
      history.push('/recipe');
    } catch (err) {
      window.alert('Unable to fetch recipes. Please try again');
      console.error(err.message);
    }
  };
};

let initialState = [];

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
    case REMOVE_RECIPES:
      return [];
    default:
      return state;
  }
};

export default recipeReducer;
