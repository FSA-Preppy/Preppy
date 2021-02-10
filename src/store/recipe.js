import axios from "axios";

const GET_RECIPE = "GET_RECIPE";

const getRecipe = (recipes) => {
  return {
    type: GET_RECIPE,
    recipes,
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
      let array = [];
      for (let i = 0; i < data.hits.length; i++) {
        array.push({
          image: data.hits[i].recipe.image,
          url: data.hits[i].recipe.url,
          name: data.hits[i].recipe.label,
          createdAt: Date.now(),
          creatorId: userId,
        });
      }
      window.confirm(`Fetching Recipes including: ${productList}`);
      dispatch(getRecipe(array));
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
    default:
      return state;
  }
};
