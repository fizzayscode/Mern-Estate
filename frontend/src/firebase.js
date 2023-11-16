// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fizzayetstate.firebaseapp.com",
  projectId: "fizzayetstate",
  storageBucket: "fizzayetstate.appspot.com",
  messagingSenderId: "480091173667",
  appId: "1:480091173667:web:3acaccb18d8fa1503fd296",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
