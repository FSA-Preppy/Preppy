import { createStore, combineReducers, applyMiddleware } from "redux";
import user, { setUser } from "./user";
import ingredients, { fetchIngredients } from "./ingredients";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  user,
  ingredients,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export { setUser, fetchIngredients };
export default store;
