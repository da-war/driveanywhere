// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdpYD_m-K-vzj_3Lyx2yaJcN0iJI22W4I",
  authDomain: "driveanywhere-daab0.firebaseapp.com",
  projectId: "driveanywhere-daab0",
  storageBucket: "driveanywhere-daab0.appspot.com",
  messagingSenderId: "641696592812",
  appId: "1:641696592812:web:5b783c64776d73ff0a4009",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
