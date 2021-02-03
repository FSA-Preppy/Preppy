import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../fbase';
import Quagga from 'quagga';
import { connect } from 'react-redux';
import axios from 'axios';

//todo, replace axios calls with thunks; manually add items(possibly with autocomplete via an); add items using returned barcode information

const Search = () => {
  let codeCollection = [];
  let _scannerIsRunning = false;
  let QuaggaInit = false;

  //console.log(document.getElementById('videoFile'));
  //const [recipeData, setRecipeData] = useState(null);
  const [item, setItem] = useState('');

  function handleChange(e) {
    setItem(e.target.value);
  }

  function handleSubmit() {
    //todo: add function for manually submitting food item to users fridge collection
  }

  function getProduct(code) {
    let product = '';
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?upc=${code}&app_id=2b951423&app_key=
      0a3f7f60c2858ebe6e8ed1059ef0052e`

      //app ID ee8d7e3a
      //app key f2876f55d65442e23c22ec308974a5f7
      //https://api.edamam.com/search?r={code}&app_id=ee8d7e3a&app_key=f2876f55d65442e23c22ec308974a5f7
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hints[0].food.label);
        product = data.hints[0].food.label;
        //dbService.collection('ingredients').add
      })
      .then(() => {
        console.log(product);
        getRecipe(product);
      })
      .catch((err) => {
        console.log('error returning product via upc', err);
      });
    //console.log('after exiting fetch in getProduct', product);
  }

  function getRecipe(product) {
    let name = '';
    for (let i = 0; i < product.length; i++) {
      if (product[i] === ' ') {
        name += '+';
      } else {
        name += product[i];
      }
    }
    console.log(name);

    fetch(
      `https://api.edamam.com/search?q=${name}&app_id=ee8d7e3a&app_key=f2876f55d65442e23c22ec308974a5f7&`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //dbService.collection('ingredients').add
      })
      .catch(() => {
        console.log('error returning recipes with name');
      });
  }

  function getBarCode() {
    let toggle = document.getElementById('scanner');

    toggle.style.display = 'block';
    console.log('init starting');

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.getElementById('scanner'),
          constraints: {
            width: 480,
            height: 320,
            facingMode: 'environment',
          },
          frequency: 1,
        },
        decoder: {
          readers: ['upc_reader'],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }

        console.log('Initialization finished. Ready to start');
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
      }
    );
    QuaggaInit = true;

    Quagga.onDetected(function (result) {
      //TODO: scanner currently returns current + all prior scans on each scan, only want current
      //TODO: scanner should close frame after scanning is complete
      let code = result.codeResult.code;
      codeCollection.push(code);
      console.log(
        'Barcode detected and processed : [' + code + ']',
        result,
        typeof result.codeResult.code
        //query spoonacular for the product
      );
      Quagga.stop();
      getProduct(codeCollection[0]);
      codeCollection = codeCollection.slice(0, 1);
      toggle.style.display = 'none';
      _scannerIsRunning = false;
    });
  }

  return (
    <div>
      <header className="scan-header">
        <button
          id="scanButton"
          onClick={() => {
            // if (_scannerIsRunning) {
            //   Quagga.stop();
            //   _scannerIsRunning = false;
            // } else {
            getBarCode();
          }}
        >
          Start/Stop Scan
        </button>
        <div id="scanner"></div>
      </header>
      <div>
        <input
          type="string"
          placeholder="food item name"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {/* <div>
            <button onClick={getRecipe}>Get Recipe</button>
          </div> */}
      </div>
    </div>
  );
};
function mapState(state) {
  return { user: state.user };
}

export default connect(mapState, null)(Search);
