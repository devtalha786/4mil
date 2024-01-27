import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBzkHCSqZWJzpChxUAzlpJ-H0DppnqYY3A",
  authDomain: "the-4mil-process.firebaseapp.com",
  projectId: "the-4mil-process",
  storageBucket: "the-4mil-process.appspot.com",
  messagingSenderId: "896095943857",
  appId: "1:896095943857:web:d93c4c6abdb7b11c0f7690",
  measurementId: "G-VV2966G1C6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;