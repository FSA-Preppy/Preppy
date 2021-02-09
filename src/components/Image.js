import React, { useEffect } from "react";
import { storageService } from "../fbase";
import { useForm } from "react-hook-form";
import "../styles/imagestyle.css";
import {
  fetchIngredients,
  addIngredientThunk,
  deleteIngredientThunk,
} from "../store";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Image = (props) => {
  const { register, handleSubmit } = useForm();
let history = useHistory()
  useEffect(() => {
    props.getIngredients(props.user);
  }, []);
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
              apiKey: "56845686f90a46a6a81e02c55bccd615",
              imageUrl: url,
            },
          }
        );
        if (!props.ingredients.includes(data.category.name)) {
          props.addIngredient(props.user, data.category.name);
          history.push("/fridge");
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
    <>
      <div className="image-main-container">
        <div className="image-header-container">
          <h1 className="image-title">CAMERA</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onFileChange)}>
            <label htmlFor="videoFile">UPLOAD A PHOTO:</label>
            <input
              ref={register}
              type="file"
              name="image"
              id="videoFile"
              capture="environment"
              accept="camera/*"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
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
    getIngredients: (userId) => dispatch(fetchIngredients(userId)),
    addIngredient: (userId, ingredient) =>
      dispatch(addIngredientThunk(userId, ingredient)),
    deleteIngredient: (userId, ingredient) =>
      dispatch(deleteIngredientThunk(userId, ingredient)),
  };
};

export default connect(mapState, mapDispatch)(Image);
