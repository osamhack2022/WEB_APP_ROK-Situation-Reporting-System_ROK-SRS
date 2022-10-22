// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBanpq8RSFEdjeLuPLFLxP5SSSaRiuQt_Q",
  authDomain: "roka-srs.firebaseapp.com",
  projectId: "roka-srs",
  storageBucket: "roka-srs.appspot.com",
  messagingSenderId: "507147817796",
  appId: "1:507147817796:web:322e5dd0bd63c0dc033d11",
  measurementId: "G-2TFC1LHNV0"
};

// Initialize Firebase
console.log(getFirestore)
const app = initializeApp(firebaseConfig);
const db = getFirestore()
//const analytics = getAnalytics(app);

export {db}