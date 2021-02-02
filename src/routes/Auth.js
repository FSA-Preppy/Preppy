import { authService, firebaseInstance } from "fbase";
import React, { useState, useEffect } from "react";
import "./authstyle.css";

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

    const {
      target: { value },
    } = evt;

    try {
      let data;
      if (value === "signup") {
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
                src="https://firebasestorage.googleapis.com/v0/b/preppy-food.appspot.com/o/PreppyLogo3.png?alt=media&token=363494e0-ffbb-4da8-8da9-110c6304e564"
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
                src="https://firebasestorage.googleapis.com/v0/b/preppy-food.appspot.com/o/PreppyLogo3.png?alt=media&token=363494e0-ffbb-4da8-8da9-110c6304e564"
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
            <input type="submit" className="btn" value="Sign Up" required />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Sign up here, and start with Preppy today!</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/preppy-food.appspot.com/o/chefNoBG.png?alt=media&token=a985e22d-c41c-4eab-9d7d-afdceea0da11"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Sign in here, and starting preppin' your recipes with Preppy!</p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/preppy-food.appspot.com/o/signinNoBG.png?alt=media&token=895f759f-551d-4513-ae7e-bf5305c3ba3e"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;