import React, { useState, useEffect } from "react";
import Quagga from "@ericblade/quagga2";
import { connect } from "react-redux";
import axios from "axios";
import { addIngredientThunk } from "../store/index";
import "../styles/searchstyle.css";
import { edamamAPIKey } from "../config/edamamAPI";
//todo, replace axios calls with thunks; manually add items(possibly with autocomplete via an); add items using returned barcode information

const Search = (props) => {
  useEffect(() => {
    getBarCode();
  }, []);

  const { user, ingredients } = props;
  let [code, setCode] = useState("");

  function getBarCode() {
    console.log("init starting");
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.getElementById("scanner"),
          constraints: {
            width: window.width,
            height: window.height,
            facingMode: "environment",
          },
          frequency: 1,
        },
        decoder: {
          readers: ["upc_reader"],
        },
        locate: false,
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );
    Quagga.onDetected(async function (result) {
      let returned = result.codeResult.code;
      setCode((code = returned));
      console.log(
        "Barcode detected and processed : [" + code + typeof code + "]"
      );
      Quagga.offDetected();
      Quagga.stop();
      await getProduct(code);
    });
  }

  async function getProduct(code) {
    //THUNK
    try {
      let {
        data,
      } = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?upc=${code}&app_id=2b951423&app_key=
    ${edamamAPIKey}`);
      let product = data.hints[0].food.label;

      if (product) {
        if (!ingredients.includes(product)) {
          console.log("user-->", user);
          await props.addIngredient(user, product);
        } else {
          window.alert("Item already exist in fridge");
        }
      }
    } catch (error) {
      window.alert("Barcode was not recognized");
      Quagga.offDetected();
      Quagga.stop();
      getBarCode();
      console.log("error returning product via upc", error);
    }
  }

  return (
    <>
      <div className="search-main-container">
        <div className="search-header-container">
          <h1 className="search-title">Scanner</h1>
        </div>
        <div>
          <header className="scan-header">
            <div id="scanner"></div>
          </header>
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
    addIngredient: (userId, ingredient) =>
      dispatch(addIngredientThunk(userId, ingredient)),
  };
};

export default connect(mapState, mapDispatch)(Search);
