// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkafDYy9l1VbpIzkr-dFJQp6ivEIC0GEk",
  authDomain: "roka-srs-7afac.firebaseapp.com",
  projectId: "roka-srs-7afac",
  storageBucket: "roka-srs-7afac.appspot.com",
  messagingSenderId: "919446399362",
  appId: "1:919446399362:web:4f56e14e55e06cb063079b",
  measurementId: "G-1JYFFV9CPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
//const analytics = getAnalytics(app);

export {db}