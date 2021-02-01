import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (evt) => {
    const {
      target: { name, value },
    } = evt;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };
  const onSubmit = async (evt) => {
    evt.preventDefault();

    try {
      let data;
      if (newAccount) {
        //If the new account was created, the user is signed in automatically.
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const onClickWithSocial = async (evt) => {
    const {
      target: { name },
    } = evt;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  const toggleAcct = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Sign Up" : "Log In"}
          required
        />
        <span>{error}</span>
      </form>
      <div>
        <button name="google" onClick={onClickWithSocial}>
          Sign In with Google
        </button>
      </div>
      <span> Do you already have an account?</span>
      <button onClick={toggleAcct}>{newAccount ? "Yes" : "No"}</button>
    </div>
  );
};

export default Auth;
