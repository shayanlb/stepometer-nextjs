import generateStepometerData from "./generateStepometerData";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../app/firebase";
async function sendDataToFirestore() {
  let delay_in_seconds = 10;
  let delay_in_days = 12; //10,11,12

  let number_of_entries_for_firestore_normal = 120;
  let firestore_collection_name_normal = "stepometer_normal";
  let pressure_left_normal = 45;
  let pressure_right_normal = 50;

  let number_of_entries_for_firestore_left = 0;
  let firestore_collection_name_left = "stepometer_left";
  let pressure_left_left = 23;
  let pressure_right_left = 34;

  let number_of_entries_for_firestore_right = 0;
  let firestore_collection_name_right = "stepometer_right";
  let pressure_left_right = 65;
  let pressure_right_right = 75;

  for (let index = 0; index < number_of_entries_for_firestore_normal; index++) {
    let time_difference = {
      seconds: delay_in_seconds + index + delay_in_seconds,
      day: delay_in_days,
    };
    let data = generateStepometerData(
      0,
      10,
      pressure_left_normal,
      pressure_right_normal,
      time_difference
    );
    const docRef = await addDoc(
      collection(db, firestore_collection_name_normal),
      data
    );
  }

  for (let index = 0; index < number_of_entries_for_firestore_left; index++) {
    let time_difference = {
      seconds: delay_in_seconds + index + delay_in_seconds,
      day: delay_in_days,
    };
    let data = generateStepometerData(
      0,
      10,
      pressure_left_left,
      pressure_right_left,
      time_difference
    );
    const docRef = await addDoc(
      collection(db, firestore_collection_name_left),
      data
    );
  }

  for (let index = 0; index < number_of_entries_for_firestore_right; index++) {
    let time_difference = {
      seconds: delay_in_seconds + index + delay_in_seconds,
      day: delay_in_days,
    };
    let data = generateStepometerData(
      0,
      10,
      pressure_left_right,
      pressure_right_right,
      time_difference
    );
    const docRef = await addDoc(
      collection(db, firestore_collection_name_right),
      data
    );
  }
  return {
    delay_in_seconds,
    delay_in_days,
    number_of_entries_for_firestore_normal,
    firestore_collection_name_normal,
    number_of_entries_for_firestore_left,
    firestore_collection_name_left,
    number_of_entries_for_firestore_right,
    firestore_collection_name_right,
  };
}
export default sendDataToFirestore;
