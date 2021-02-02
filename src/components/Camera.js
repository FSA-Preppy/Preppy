import React, { useState } from "react";

const Camera = () => {
  console.log(document.getElementById("videoFile"));
  const [recipeData, setRecipeData] = useState(null);
  const [recipes, setRecipe] = useState("");

  function handleChange(e) {
    setRecipe(e.target.value);
  }
  function getRecipe() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=82531e4750b04126a65eef104f2bce2e&query=${recipes}&numer=2`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
        console.log(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            <label for="videoFile">Upload a video:</label>
            <input
              type="file"
              id="videoFile"
              capture="environment"
              accept="camera/*"
            />
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          <input
            type="string"
            placeholder="food item name"
            onChange={handleChange}
          />
          <div>
            <button onClick={getRecipe}>Get Recipe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
