import React, { useState } from "react";
import "./App.css";

function App() {
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
      <input
        type="string"
        placeholder="food item name"
        onChange={handleChange}
      />
      <div>
        <button onClick={getRecipe}>Get Recipe</button>
      </div>
    </div>
  );
}

export default App;
