import { dbService } from "../fbase";

const GET_INGREDIENTS = "GET_INGREDIENTS";

const getIngredients = (ingredients) => {
  return {
    type: GET_INGREDIENTS,
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

export default (state = [], action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
    default:
      return [];
  }
};
