// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCft0nKUa6ASahm-X7xzq52yT48ZV6MjrU",
  authDomain: "ebuddy-rifky.firebaseapp.com",
  projectId: "ebuddy-rifky",
  storageBucket: "ebuddy-rifky.firebasestorage.app",
  messagingSenderId: "604626504623",
  appId: "1:604626504623:web:6f6afaa3b748fa7c327d5a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
