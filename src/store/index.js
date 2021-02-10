import { createStore, combineReducers, applyMiddleware } from "redux";
import user, { removeUser, setUser } from "./user";
import ingredients, {
  removeIngredients,
  fetchIngredients,
  addIngredientThunk,
  deleteIngredientThunk,
} from "./ingredients";
import recipes, { addRecipeThunk } from "./recipe";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  user,
  ingredients: ingredients,
  recipes,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export {
  removeUser,
  setUser,
  fetchIngredients,
  addIngredientThunk,
  deleteIngredientThunk,
  removeIngredients,
  addRecipeThunk,
};
export default store;
