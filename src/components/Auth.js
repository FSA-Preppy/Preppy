import { authService, firebaseInstance } from "../fbase";
import React, { useState, useEffect } from "react";
import "../styles/authstyle.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (evt) => {
    const {
      target: { name, value },
    } = evt;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (evt) => {
    try {
      evt.preventDefault();

      const {
        target: { value },
      } = evt;

      let data;
      if (newAccount) {
        console.log("test");
        //If the new account was created, the user is signed in automatically.
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
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

  const reset = () => {
    setEmail("");
    setPassword("");
    setNewAccount(!newAccount);
  };

  //CSS related functions*****
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  });

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={onSubmit} className="sign-in-form">
            <h2 className="title">
              <img
                className="preppy-logo"
                src="images/PreppyLogo3.png"
                alt="Preppy"
              />
              Sign in
            </h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
              />
            </div>
            <span>{error}</span>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
              />
            </div>
            <input
              type="submit"
              value="Log In"
              className="btn solid"
              required
            />
            <p className="social-text">Or Sign in with Google</p>
            <div className="social-media">
              <button
                className="social-icon"
                name="google"
                onClick={onClickWithSocial}
              >
                <i className="fab fa-google"></i>
              </button>
            </div>
          </form>
          <form onSubmit={onSubmit} className="sign-up-form" value="signup">
            <h2 className="title">
              <img
                className="preppy-logo"
                src="images/PreppyLogo3.png"
                alt="Preppy"
              />
              Sign up
            </h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
              />
            </div>
            <span>{error}</span>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Sign up here, and start with Preppy today!</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => reset()}
            >
              Sign up
            </button>
          </div>
          <img src="images/chefNoBG.png" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Sign in here, and starting preppin' your recipes with Preppy!</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => reset()}
            >
              Sign in
            </button>
          </div>
          <img src="images/signinNoBG.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Auth;