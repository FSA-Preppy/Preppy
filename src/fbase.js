import firebase from "firebase/app";
import  "firebase/auth"
//only for github.
//REACT_APP_ is required if you created an app using create-react-app command

var firebaseConfig = {
  apiKey: "AIzaSyDnLE7T7WRPqnLrYxu-s-jKBJxAKpICLWo",
  authDomain: "preppy-food.firebaseapp.com",
  projectId: "preppy-food",
  storageBucket: "preppy-food.appspot.com",
  messagingSenderId: "901609858958",
  appId: "1:901609858958:web:bc80a1eaab1295cca0a6df"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;
export const authService = firebase.auth()
