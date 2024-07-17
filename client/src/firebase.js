// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-53a82.firebaseapp.com",
  projectId: "mern-estate-53a82",
  storageBucket: "mern-estate-53a82.appspot.com",
  messagingSenderId: "1078223103132",
  appId: "1:1078223103132:web:2b2c9b48e1b279acab3959",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
