
import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles/fridgestyle.css";
import { deleteIngredientThunk, addRecipeThunk } from "../store";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


toast.configure();
SwiperCore.use([Navigation, Pagination, A11y]);

const Fridge = (props) => {
  const { deleteIngredient, user, ingredients, addRecipes } = props;
  const [activeIng, setActiveIng] = useState([]);
  let history = useHistory();
  async function formatNames(activeIngredients) {
    let productList = [];
    let name = '';
    for (let i = 0; i < activeIngredients.length; i++) {
      name = activeIngredients[i].replaceAll(' ', '+');
      productList.push(name);
    }
    const output = await addRecipes(user, productList, history);
    console.log(output);
    if (output) setActiveIng([]);
  }

  const settingActiveIng = (singleIngredient) => {
    setActiveIng([...activeIng, singleIngredient]);
  };

  const removeActiveIng = (singleIngredient) => {
    setActiveIng(activeIng.filter((item) => item !== singleIngredient));
  };
  const notifyAdd = () => {
    toast.success(`🔪  Successfully added`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyRemove = () => {
    toast.error(`🔪  Removed from board!`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <div className="fridge-animation-area">
        <div className="fridge-header-container">
          <h1 className="fridge-title">Fridge</h1>
        </div>
        <div>
          <div>
            <ul className="fridge-box-area">
              <div className="fridge-btn-container">
                <div className="single-ingredient-box">
                  <div className="fridge-swiper-container">
                    <div className="fridge-swiper-wrapper">
                      <Swiper
                        effect="fade"
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                      >
                        {ingredients.map((singleIngredient, idx) => {
                          return (
                            <SwiperSlide
                              key={idx}
                              className="single-ingredient-swiper-wrapper"
                            >
                              <div className="single-ingredient-container">
                                <div className="fridge-left-panel">
                                  <div className="ingredient-name">
                                    {singleIngredient.split('_').join(' ')}
                                  </div>
                                  {activeIng.includes(singleIngredient) ? (
                                    <button
                                      className="fridge-button"
                                      onClick={() =>
                                        {removeActiveIng(singleIngredient);
                                        notifyRemove()}
                                      }
                                    >
                                      Remove from board
                                    </button>
                                  ) : (
                                    <button
                                      className="fridge-button"
                                      onClick={() => {
                                        settingActiveIng(singleIngredient);
                                        notifyAdd();
                                      }}
                                    >
                                      Add to board
                                    </button>
                                  )}
                                  <button
                                    className="fridge-button"
                                    onClick={() => {
                                      removeActiveIng(singleIngredient);
                                      deleteIngredient(user, singleIngredient);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div className="get-recipe-box">
                  <div className="get-recipe-container">
                    {!activeIng.length ? (
                      <>
                        <div id="recipe-notice">
                          WANT <strong id="preppy">PREPPY</strong> RECIPES?
                          <br></br>ADD INGREDIENTS TO THE BOARD!
                        </div>
                        <button
                          className="get-recipe-button"

                          style={{ display: "none" }}
                          onClick={() => {
                            formatNames(activeIng);
                            
                          }}

                        >
                          Get Recipes!
                        </button>
                      </>
                    ) : (
                      <button
                        className="get-recipe-button"
                        onClick={() => formatNames(activeIng)}
                      >
                        Get Recipes!
                      </button>
                    )}
                    <div>
                      {activeIng.map((ingredient, idx) => {
                        return (
                          <div key={idx} className="recipe-ingredient-name">
                            {ingredient.split('_').join(' ')}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* background css animation boxes */}
              <li className="fas fa-hamburger"></li>
              <li className="fas fa-fish"></li>
              <li className="fas fa-drumstick-bite"></li>
              <li className="fas fa-lemon"></li>
              <li className="fas fa-pizza-slice"></li>
              <li className="fas fa-carrot"></li>
              <li className="fas fa-cheese"></li>
              <li className="fas fa-ice-cream"></li>
              <li className="fas fa-cookie"></li>
              {/* background css animation boxes */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    ingredients: state.ingredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    deleteIngredient: (userId, ingredient) =>
      dispatch(deleteIngredientThunk(userId, ingredient)),
    addRecipes: (userId, productList, history) =>
      dispatch(addRecipeThunk(userId, productList, history)),
  };
};

export default connect(mapState, mapDispatch)(Fridge);
