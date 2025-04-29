// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3dMQXo-CcyA4Kk8ClGQoKCg7pZTy-_DE",
  authDomain: "smarthireai-5dc78.firebaseapp.com",
  projectId: "smarthireai-5dc78",
  storageBucket: "smarthireai-5dc78.firebasestorage.app",
  messagingSenderId: "995040073512",
  appId: "1:995040073512:web:f0309699a17ac74be4621d",
  measurementId: "G-642404WMC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);