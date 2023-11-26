import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// import { getDatabase, ref, onValue } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const docRef = doc(collection(db, "stepometer"));
export function WriteFBDB() {
  const docData = {
    pressure_left: 40,
    pressure_right: 60,
    status: "success",
    steps: 9,
    timestamp: 12345678,
  };
  setDoc(docRef, docData);
  return <h1>hi</h1>;
}
