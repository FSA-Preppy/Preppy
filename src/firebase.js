import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnLE7T7WRPqnLrYxu-s-jKBJxAKpICLWo",
  authDomain: "preppy-food.firebaseapp.com",
  projectId: "preppy-food",
  storageBucket: "preppy-food.appspot.com",
  messagingSenderId: "901609858958",
  appId: "1:901609858958:web:bc80a1eaab1295cca0a6df",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
