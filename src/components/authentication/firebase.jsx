import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtger6DxiV71tddLtSXYEANaSteTRfXaE",

  authDomain: "http-request-movie.firebaseapp.com",

  databaseURL: "https://http-request-movie-default-rtdb.firebaseio.com",

  projectId: "http-request-movie",

  storageBucket: "http-request-movie.firebasestorage.app",

  messagingSenderId: "312595200770",

  appId: "1:312595200770:web:4beb49c7ead1753d3fe01b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
