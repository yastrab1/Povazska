// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD6HuoXEHXVUNnrgGh5RzJRF_qvDsL5OI",
  authDomain: "mestskepodnety.firebaseapp.com",
  projectId: "mestskepodnety",
  storageBucket: "mestskepodnety.firebasestorage.app",
  messagingSenderId: "331021342002",
  appId: "1:331021342002:web:b8b34cfcaaf5c0f5bd732b",
  measurementId: "G-KH4RY3559Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
