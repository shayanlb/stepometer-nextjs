import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD-WedILd-Swa5a1DdcGFuWcCnALSFaII",
  authDomain: "stepometer-7964a.firebaseapp.com",
  databaseURL: "https://stepometer-7964a-default-rtdb.firebaseio.com",
  projectId: "stepometer-7964a",
  storageBucket: "stepometer-7964a.appspot.com",
  messagingSenderId: "948550613332",
  appId: "1:948550613332:web:bcc807353609981353b0c1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
