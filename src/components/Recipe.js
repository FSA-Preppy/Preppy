import React from 'react';
import { connect } from 'react-redux';
import '../styles/recipestyle.css';

const Recipe = (props) => {
  const { recipes } = props;

  return (
    <>
      <div className="animation-area">
        <div className="header-container">
          <h1 className="title">Recipes</h1>
        </div>

        <div>
          <ul>
            {recipes.map((recipe) => {
              return (
                <li key={recipe.id}>
                  <img
                    alt={recipe.name}
                    src={recipe.image}
                    style={{ height: '10rem', width: '12rem' }}
                  />
                  <br></br>
                  <a href={recipe.url}>{recipe.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
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

export default connect(mapState, null)(Recipe);
