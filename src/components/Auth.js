import { authService, firebaseInstance } from "../fbase";
import React, { useState, useEffect } from "react";
import "../styles/authstyle.css";
import signinBG from "../styles/images/signinNoBG.png";
import preppyLogo from "../styles/images/PreppyLogoFinal.png";
import loginImg from "../styles/images/login.png";
import { Alert } from "@material-ui/lab";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState(null);

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

      if (newAccount) {
        //If the new account was created, the user is signed in automatically.
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      if (
        error.message ===
        "The password is invalid or the user does not have a password."
      ) {
        setError("Invalid password. Please try again.");
      } else if (
        error.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        setError("User account does not exist");
      } else if (
        error.message ===
        "The email address is already in use by another account."
      ) {
        setError("Email address already in use");
      } else setError(error.message);
    }
  };

  const onClickWithSocial = async () => {
    try {
      const provider = new firebaseInstance.auth.GoogleAuthProvider();
      await authService.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
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
            {error ? (
              <Alert severity="error" style={{ margin: 10 }}>
                {error}
              </Alert>
            ) : null}
            <h2 className="auth-title">
              <img className="preppy-logo" src={preppyLogo} alt="Preppy" />
              Log In
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
            <p className="social-text">Sign in with Google</p>
            <button
              className="social-icon"
              name="google"
              onClick={onClickWithSocial}
            >
              <i className="fab fa-google" />
            </button>
          </form>
          {/* <div className="social-media"></div> */}
          <form onSubmit={onSubmit} className="sign-up-form" value="signup">
            {error ? (
              <Alert severity="error" style={{ margin: 10 }}>
                {error}
              </Alert>
            ) : null}
            <h2 className="auth-title">
              <img className="preppy-logo" src={preppyLogo} alt="Preppy" />
              Sign Up
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
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content-container">
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
          </div>
          <div className="loginImg-container">
            <img src={loginImg} className="image" alt="" />
          </div>
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
              Log In
            </button>
          </div>
          <img src={signinBG} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
