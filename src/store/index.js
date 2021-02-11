import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer, { removeUser, setUser } from './user';
import ingredientReducer, {
  removeIngredients,
  fetchIngredients,
  addIngredientThunk,
  deleteIngredientThunk,
} from './ingredients';
import recipeReducer, { addRecipeThunk, removeRecipes } from './recipe';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReducer,
  recipes: recipeReducer,
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
  removeRecipes,
};
export default store;
