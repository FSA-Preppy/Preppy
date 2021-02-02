import React, { useState } from 'react';
import Quagga from 'quagga';

//todo, replace axios calls with thunks; manually add items(possibly with autocomplete via an api); add items using returned barcode information

const Search = () => {
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
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?upc=${code}&app_id=2b951423&app_key=
      0a3f7f60c2858ebe6e8ed1059ef0052e`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch(() => {
        console.log('error returning product via upc');
      });
  }

  function getBarCode() {
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

    Quagga.onDetected(function (result) {
      console.log(
        'Barcode detected and processed : [' + result.codeResult.code + ']',
        typeof result.codeResult.code
        //query spoonacular for the product
      );
      Quagga.stop();
      getProduct(result.codeResult.code);
    });
  }

  return (
    <div>
      <header className="scan-header">
        <div id="scanner">
          <button
            id="scanButton"
            onClick={() => {
              if (_scannerIsRunning) {
                Quagga.stop();
                _scannerIsRunning = false;
              } else {
                getBarCode();
              }
            }}
          >
            Start/Stop Scan
          </button>
        </div>
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

export default Search;
