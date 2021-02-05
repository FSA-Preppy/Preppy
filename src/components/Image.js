import React, { useState, useEffect } from "react";
import { storageService, dbService } from "../fbase";
import { useForm } from "react-hook-form";
import {
  fetchIngredients,
  addIngredientThunk,
  deleteIngredientThunk,
} from "../store";
import axios from "axios";
import { connect } from "react-redux";
import Fridge from "./Fridge";

const Image = (props) => {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    props.getIngredients(props.user);
  }, []);
  const onFileChange = async (data) => {
    try {
      const storageRef = storageService.ref();
      const fileRef = storageRef.child(data.image[0].name);
      const upload = await fileRef.put(data.image[0]);
      const url = await upload.ref.getDownloadURL();
      console.log(upload);
      if (upload) {
        console.log("Uploaded the File");
        const { data } = await axios.get(
          `https://api.spoonacular.com/food/images/analyze`,
          {
            params: {
              apiKey: "4b34c62d3a0844dda95902bf18ec9dc1",
              imageUrl: url,
            },
          }
        );
        // console.log(props.addIngredient)
        // console.log(props.user)
        // console.log(data.category.name);

        // console.log(props.deleteIngredient(props.user, data.category.name))

        if (!props.ingredients.includes(data.category.name)) {
          props.addIngredient(props.user, data.category.name);
          // window.alert(data.category.name);
          // dbService.collection("ingredients").add({
          //   name: data.category.name,
          //   createdAt: Date.now(),
          //   creatorId: props.user,
          // });
        } else {
          window.alert("Same item cannot be added");
        }
        if (data) upload.ref.delete();
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  console.log(props.ingredients);

  return (
    <>
      <form onSubmit={handleSubmit(onFileChange)}>
        <label htmlFor="videoFile">Upload a video:</label>
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
