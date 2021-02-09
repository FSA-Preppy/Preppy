import React, { useState, useEffect } from "react";
import Quagga from "@ericblade/quagga2";
import { connect } from "react-redux";
import axios from "axios";
import {
  setIngredient,
  fetchIngredients,
  addIngredientThunk,
  deleteIngredientThunk,
} from "../store/index";
import "../styles/searchstyle.css";
import { useHistory } from "react-router-dom";

//todo, replace axios calls with thunks; manually add items(possibly with autocomplete via an); add items using returned barcode information

const Search = (props) => {
  let history = useHistory();

  const { getIngredients, deleteIngredient, user, ingredients } = props;

  let _scannerIsRunning = false;
  let QuaggaInit = false;

  let [code, setCode] = useState("");

  useEffect(() => {
    getIngredients(user);
  }, []);

  function getBarCode() {
    let toggle = document.getElementById("scanner");

    toggle.style.display = "block";
    console.log("init starting");

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.getElementById("scanner"),
          constraints: {
            width: 480,
            height: 320,
            facingMode: "environment",
          },
          frequency: 1,
        },
        decoder: {
          readers: ["upc_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        _scannerIsRunning = true;
      }
    );
    QuaggaInit = true;

    Quagga.onDetected(async function (result) {
      let returned = result.codeResult.code;
      setCode((code = returned));

      console.log(
        "Barcode detected and processed : [" + code + typeof code + "]"
      );
      Quagga.stop();
      Quagga.offDetected();
      await getProduct(code);
    });
  }

  async function getProduct(code) {
    //THUNK
    try {
      let {
        data,
      } = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?upc=${code}&app_id=2b951423&app_key=
    0a3f7f60c2858ebe6e8ed1059ef0052e`);
      let product = data.hints[0].food.label;

      if (!ingredients.includes(product)) {
        props.addIngredient(props.user, product);
        history.push("/fridge");
      } else {
        window.alert("Same item cannot be added");
      }
    } catch (error) {
      console.log("error returning product via upc", error);
    }
  }

  return (
    <>
      <div className="search-main-container">
        <div className="search-header-container">
          <h1 className="search-title">SCANNER</h1>
        </div>
        <div>
          <header className="scan-header">
            <button
              id="scanButton"
              onClick={() => {
                getBarCode();
              }}
            >
              Start/Stop Scan
            </button>
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
    getIngredients: (userId) => dispatch(fetchIngredients(userId)),
    addIngredient: (userId, ingredient) =>
      dispatch(addIngredientThunk(userId, ingredient)),
    deleteIngredient: (userId, ingredient) =>
      dispatch(deleteIngredientThunk(userId, ingredient)),
  };
};

export default connect(mapState, mapDispatch)(Search);
