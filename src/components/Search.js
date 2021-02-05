import React, { useState, useEffect } from 'react';
import { dbService, storageService } from '../fbase';
import Quagga from '@ericblade/quagga2';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Image from './Image';
import { setIngredient, fetchIngredients } from '../store/index';
import { useHistory } from 'react-router-dom';

//todo, replace axios calls with thunks; manually add items(possibly with autocomplete via an); add items using returned barcode information

const Search = (props) => {
  let history = useHistory();
  let codeCollection = [];
  let _scannerIsRunning = false;
  let QuaggaInit = false;

  //console.log(document.getElementById('videoFile'));
  //const [recipeData, setRecipeData] = useState(null);
  const [item, setItem] = useState('test');
  const [productList, setProductList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState('Not Found');
  let [code, setCode] = useState('');

  useEffect(() => {
    setProductList(props.ingredients);
  }, []);

  function handleChange(e) {
    setItem(e.target.value);
  }

  function handleSubmit() {
    //todo: add function for manually submitting food item to users fridge collection
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

    Quagga.onDetected(async function (result) {
      //TODO: scanner currently returns current + all prior scans on each scan, only want current
      //TODO: scanner should close frame after scanning is complete
      let returned = result.codeResult.code;
      setCode((code = returned));

      //codeCollection.push(code);
      console.log(
        'Barcode detected and processed : [' + code + typeof code + ']'
      );
      Quagga.stop();
      Quagga.offDetected();
      await getProduct(code);
      //getProduct(code);
      //codeCollection = codeCollection.slice(0, 1);
      //toggle.style.display = 'none';
      //_scannerIsRunning = false;
      // Quagga.onProcessed((result) => {
      //   console.log(result);
      //   // getProduct(code);
      // });
      //Quagga.stop();
    });

    // history.push('/');
  }

  async function getProduct(code) {
    //THUNK
    try {
      let {
        data,
      } = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?upc=${code}&app_id=2b951423&app_key=
    0a3f7f60c2858ebe6e8ed1059ef0052e`);
      let product = data.hints[0].food.label;

      console.log(product);

      console.log(props);
      if (!productList.includes(product)) {
        setProductList([...productList, product]);
        if (!productList.includes(product)) {
          props.setIngredient(product, props.user);
        }
      }
      //formatNames(product);
      //console.log('92',);
    } catch (error) {
      console.log('error returning product via upc', error);
    }
  }

  // async function formatNames(product) {
  //   //let productList = [];
  //   console.log('Line 100 ->>>>>>>', product);
  //   let name = await product.replaceAll(' ', '+');

  //   if (!productList.includes(name) && name !== '') {
  //     setProductList([...productList, name]);
  //   } else {
  //     console.log(`Product List already contains ${name}`);
  //   }

  //   console.log(name, productList);
  // }

  // function getRecipe(productList) {
  //   let fullQuery = '';
  //   let searchPrefix = `https://api.edamam.com/search?`;
  //   let searchAppend = '';
  //   let searchKeys = `app_id=ee8d7e3a&app_key=f2876f55d65442e23c22ec308974a5f7`;

  //   for (let i = 0; i < productList.length; i++) {
  //     searchAppend += `q=${productList[i]}&`;
  //   }

  //   fullQuery = searchPrefix + searchAppend + searchKeys;

  //   console.log(
  //     `fetching recipes including: ` + productList + productList.length
  //   );
  //   fetch(fullQuery)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setRecipes([...recipes, data]);
  //       //dbService.collection('ingredients').add
  //       console.log(recipes);
  //     })
  //     .catch(() => {
  //       console.log('error returning recipes with name');
  //     });
  // }

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
        {/* <input
          type="string"
          placeholder="food item name"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
         <div>
            <button onClick={getRecipe}>Get Recipe</button>
          </div>  */}
      </div>
      <Image />
    </div>
  );
};
function mapState(state) {
  return { user: state.user, ingredients: state.ingredients };
}

function mapDispatch(dispatch) {
  return {
    setIngredient: (ingredient, user) => {
      dispatch(setIngredient(ingredient, user));
    },
    fetchIngredients: (user) => {
      dispatch(fetchIngredients(user));
    },
  };
}

export default connect(mapState, mapDispatch)(Search);
