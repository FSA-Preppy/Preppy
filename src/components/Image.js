import React, { useState } from "react";
import { storageService } from "fbase";
import { useForm } from "react-hook-form";
import axios from "axios";

const Image = () => {
  const { register, handleSubmit } = useForm();
  //   console.log(document.getElementById("videoFile"));
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
        // if (data) upload.ref.delete()
        window.alert(data.category.name);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div></div>
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
export default Image;
