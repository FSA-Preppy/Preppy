import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "./firebase";

function App() {
  const [setRecipeData] = useState(null);
  const [recipes, setRecipe] = useState("");
  const [users, setUsers] = useState([]);
  const db = firebase.firestore().collection("users");

  function handleChange(e) {
    setRecipe(e.target.value);
  }
  function getRecipe() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=82531e4750b04126a65eef104f2bce2e&query=${recipes}&number=2`
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

  function getUsers() {
    db.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((user) => {
        users.push(user.data());
      });
      setUsers(users);
    });
  }

  useEffect(() => {
    getUsers();
  });

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <p>
            <label>Upload a video:</label>
            <input
              type="file"
              id="videoFile"
              capture="environment"
              accept="camera/*"
            />
          </p>
        </header>
      </div>
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
      <br />
      <h1>Users</h1>
      {users.map((user, idx) => (
        <div key={idx}>
          <h2>{user.firstname}</h2>
          <h2>{user.lastname}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
