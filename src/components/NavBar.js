import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../fbase";
import { useForm } from "react-hook-form";
import { storageService } from "../fbase";
import axios from "axios";
import { addIngredientThunk, removeUser, removeIngredients } from "../store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/navbarstyle.css";

import { Icon } from "@iconify/react";
import fridgeIcon from "@iconify-icons/mdi/fridge";
import silverwareForkKnife from "@iconify-icons/mdi/silverware-fork-knife";
import barcodeScan from "@iconify-icons/mdi/barcode-scan";
import cameraIcon from "@iconify-icons/mdi/camera";
import offIcon from "@iconify-icons/el/off";

const NavBar = (props) => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const onClick = () => {
    authService.signOut();
    props.removingUser();
    props.removingIngredients();
  };

  const onFileChange = async (data) => {
    try {
      const storageRef = storageService.ref();
      const fileRef = storageRef.child(data.image[0].name);
      const upload = await fileRef.put(data.image[0]);
      const url = await upload.ref.getDownloadURL();
      if (upload) {
        console.log("Uploaded the File");
        const { data } = await axios.get(
          `https://api.spoonacular.com/food/images/analyze`,
          {
            params: {
              apiKey: "90fcba9c343249e8b9f8982669437c5c",
              imageUrl: url,
            },
          }
        );
        if (!props.ingredients.includes(data.category.name)) {
          props.addIngredient(props.user, data.category.name);
        } else {
          window.alert("Same item cannot be added");
        }
        if (data) upload.ref.delete();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar-container">
      <label htmlFor="videoFile" className="link">
        <input
          onChange={handleSubmit(onFileChange)}
          ref={register}
          type="file"
          name="image"
          id="videoFile"
          capture="environment"
          accept="camera/*"
          style={{ display: "none" }}
        />
        <Icon icon={cameraIcon} className="navbar-icon"></Icon>
      </label>
      <Link to="/search" className="link">
        <Icon icon={barcodeScan} className="navbar-icon" />
      </Link>
      <Link to="/fridge" className="link">
        <Icon icon={fridgeIcon} className="navbar-icon" />
      </Link>
      <Link to="/recipe" className="link">
        <Icon icon={silverwareForkKnife} className="navbar-icon" />
      </Link>
      <Link to="/auth" className="link">
        <Icon icon={offIcon} className="navbar-icon" onClick={onClick} />
      </Link>
    </div>
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
    addIngredient: (userId, ingredient) =>
      dispatch(addIngredientThunk(userId, ingredient)),
    removingUser: () => dispatch(removeUser()),
    removingIngredients: () => dispatch(removeIngredients()),
  };
};

export default connect(mapState, mapDispatch)(NavBar);
