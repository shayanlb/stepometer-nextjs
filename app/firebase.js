import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

export async function WriteFBDB() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Alan",
      middle: "Mathison",
      last: "Turing",
      born: 1912,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function ReadFBDB() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userData = [];

    querySnapshot.forEach((doc) => {
      userData.push({ id: doc.id, data: doc.data() });
    });

    return userData;
  } catch (e) {
    console.error("Error reading documents: ", e);
    throw e; // rethrow the error to handle it at a higher level if needed
  }
}
