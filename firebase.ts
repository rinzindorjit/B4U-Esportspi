// Import the functions you need from the SDKs you need
// FIX: Switched to Firebase v9 compat imports to match the modern SDK version.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJZXn0kLJBZmU5qwHFg3atH9J7CZlMkJI",
  authDomain: "b4u-esportspi.firebaseapp.com",
  projectId: "b4u-esportspi",
  storageBucket: "b4u-esportspi.firebasestorage.app",
  messagingSenderId: "301735096535",
  appId: "1:301735096535:web:09e4a2397c8a0cf338c092",
  measurementId: "G-4YGHH2981W"
};

// Initialize Firebase
// This v8 syntax works because of the compat libraries
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

export default app;