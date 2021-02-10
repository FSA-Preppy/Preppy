import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRecipe } from '../store';
import '../styles/recipestyle.css';

const Recipe = (props) => {
  const { user, recipes, getRecipes } = props;
  useEffect(() => {
    getRecipes(user);
  }, []);
  console.log(props);
  console.log(recipes);
  return (
    <>
      <div className="animation-area">
        <div className="header-container">
          <h1 className="title">RECIPES</h1>
        </div>

        <>
          <ul>
            {recipes.map((recipe) => {
              return (
                <li>
                  <img
                    src={recipe.image}
                    style={{ height: '10rem', width: '12rem' }}
                  />
                  <br></br>
                  <a href={recipe.url}>{recipe.name}</a>
                </li>
              );
            })}
          </ul>
        </>
        {/* <ul className="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
      </div>
    </>
  );
};

const mapState = (state) => ({ user: state.user, recipes: state.recipes });

const mapDispatch = (dispatch) => ({
  getRecipes: (userId) => dispatch(fetchRecipe(userId)),
});

export default connect(mapState, mapDispatch)(Recipe);
