// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi-HDbLla5MY-LYBalFV1_fME63B4_kAg",
  authDomain: "personal-finance-tracker-159cb.firebaseapp.com",
  databaseURL: "https://personal-finance-tracker-159cb-default-rtdb.firebaseio.com",
  projectId: "personal-finance-tracker-159cb",
  storageBucket: "personal-finance-tracker-159cb.firebasestorage.app",
  messagingSenderId: "397165915679",
  appId: "1:397165915679:web:e4f7dec6e6bb8853d0af2a"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
export const auth = getAuth(cong);
export const db = getFirestore(cong);

export default cong;