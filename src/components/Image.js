import React, { useState, useEffect } from "react";
import { storageService, dbService } from "../fbase";
import { useForm } from "react-hook-form";
import { fetchIngredients } from "../store";
import axios from "axios";
import { connect } from "react-redux";

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
              apiKey: "90fcba9c343249e8b9f8982669437c5c",
              imageUrl: url,
            },
          }
        );
        console.log({ data });
        window.alert(data.category.name);

        dbService.collection("ingredients").add({
          name: data.category.name,
          createdAt: Date.now(),
          creatorId: props.user,
        });
        if (data) upload.ref.delete();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>{props.ingredients}</div>
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
  };
};

export default connect(mapState, mapDispatch)(Image);
