import { collection, addDoc } from "firebase/firestore";
import { db } from "../app/firebase";

const WriteFirebaseDB = async () => {
  try {
    const docRef = await addDoc(collection(db, "stepometer"), {
      pressure_left: 40,
      pressure_right: 60,
      status: "success",
      steps: 9,
      timestamp: { Date: "Nov 26, 2023", Time: "09:00:00 PM" },
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
export default WriteFirebaseDB;
