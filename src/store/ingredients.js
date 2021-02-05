import { dbService } from '../fbase';

const GET_INGREDIENTS = 'GET_INGREDIENTS';
const SET_INGREDIENT = 'SET_INGREDIENT';

const getIngredients = (ingredients) => {
  return {
    type: GET_INGREDIENTS,
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
      const res = await dbService
        .collection('ingredients')
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

export const setIngredient = (ingredient, userId) => {
  return async (dispatch) => {
    try {
      console.log('thunk', ingredient);
      await dbService.collection('ingredients').add({
        name: ingredient,
        createdAt: Date.now(),
        creatorId: userId,
      });

      dispatch(_setIngredient(ingredient));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;

    case SET_INGREDIENT:
      console.log(
        'REDUCER',
        action.ingredient,
        state.includes(action.ingredient)
      );
      if (state.includes(action.ingredient)) {
        console.log(`STATE ALREADY INCLUDES ${action.ingredient}`);
        return state;
      } else {
        return [...state, action.ingredient];
      }
    default:
      return [];
  }
};
