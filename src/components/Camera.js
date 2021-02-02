import React, { useState } from 'react';
import Quagga from 'quagga';

const Camera = () => {
  console.log(document.getElementById('videoFile'));
  const [recipeData, setRecipeData] = useState(null);
  const [recipes, setRecipe] = useState('');

  function handleChange(e) {
    setRecipe(e.target.value);
  }
  function getRecipe() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=82531e4750b04126a65eef104f2bce2e&query=${recipes}&numer=2`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
        console.log(data);
      })
      .catch(() => {
        console.log('error');
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
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true,
            },
          },
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

    // Quagga.onProcessed(function (result) {
    //   let drawingCtx = Quagga.canvas.ctx.overlay,
    //     drawingCanvas = Quagga.canvas.dom.overlay;

    //   if (result) {
    //     if (result.boxes) {
    //       drawingCtx.clearRect(
    //         0,
    //         0,
    //         parseInt(drawingCanvas.getAttribute('width')),
    //         parseInt(drawingCanvas.getAttribute('height'))
    //       );
    //       result.boxes
    //         .filter(function (box) {
    //           return box !== result.box;
    //         })
    //         .forEach(function (box) {
    //           Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
    //             color: 'green',
    //             lineWidth: 2,
    //           });
    //         });
    //     }

    //     if (result.box) {
    //       Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
    //         color: '#00F',
    //         lineWidth: 2,
    //       });
    //     }

    //     if (result.codeResult && result.codeResult.code) {
    //       Quagga.ImageDebug.drawPath(
    //         result.line,
    //         { x: 'x', y: 'y' },
    //         drawingCtx,
    //         { color: 'red', lineWidth: 3 }
    //       );
    //     }
    //   }
    // });

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
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            <label for="videoFile">Upload a video:</label>
            <input
              type="file"
              id="videoFile"
              capture="environment"
              accept="camera/*"
            />
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div>
          <input
            type="string"
            placeholder="food item name"
            onChange={handleChange}
          />
          <div>
            <button onClick={getRecipe}>Get Recipe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
