import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw6PnRiqKL1kq0UkWWMNGd2sRug9VTyX4",
  authDomain: "house-marketplace-app-8ea73.firebaseapp.com",
  projectId: "house-marketplace-app-8ea73",
  storageBucket: "house-marketplace-app-8ea73.appspot.com",
  messagingSenderId: "549554627210",
  appId: "1:549554627210:web:a67dfb8ca761aa13fd0373",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
