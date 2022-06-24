import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from '@firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDGNrFiO7TV3hh_7lbFMA1rs2oRF65bbGI",
    authDomain: "uber-fdaba.firebaseapp.com",
    databaseURL: "https://uber-fdaba-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "uber-fdaba",
    storageBucket: "uber-fdaba.appspot.com",
    messagingSenderId: "733439831422",
    appId: "1:733439831422:web:b643abbd260cbf9973d72f",
    measurementId: "G-P6FQJBPGKH"
  };

export const app = initializeApp(firebaseConfig);
export const storage  = getStorage(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);