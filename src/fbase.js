import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "./config/firebaseConfig";
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

export const dbService = firebase.firestore();
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const storageService = firebase.storage();
