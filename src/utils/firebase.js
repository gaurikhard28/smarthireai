// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore,doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8dOEoSd5vrxJMiYt002mDcli4BiHZCJ8",
  authDomain: "smarthire-ai-4b4be.firebaseapp.com",
  projectId: "smarthire-ai-4b4be",
  storageBucket: "smarthire-ai-4b4be.firebasestorage.app",
  messagingSenderId: "469229935592",
  appId: "1:469229935592:web:9ece74b411524b9f60225d",
  measurementId: "G-Z1Y2D8LHQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
