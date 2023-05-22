// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4JI35fbsso2yPY9VQzJLON5ilx4PPSPY",
  authDomain: "recruiter-a00fb.firebaseapp.com",
  projectId: "recruiter-a00fb",
  storageBucket: "recruiter-a00fb.appspot.com",
  messagingSenderId: "610103963246",
  appId: "1:610103963246:web:4e52819f81449f25c4807f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
