import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAD-WedILd-Swa5a1DdcGFuWcCnALSFaII",
  authDomain: "stepometer-7964a.firebaseapp.com",
  projectId: "stepometer-7964a",
  storageBucket: "stepometer-7964a.appspot.com",
  messagingSenderId: "948550613332",
  appId: "1:948550613332:web:bcc807353609981353b0c1",
  databaseURL: "https://stepometer-7964a-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const db = getDatabase();

// const starCountRef = ref(db, "posts/" + postId + "/starCount");
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
