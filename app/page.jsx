"use client";

import { db } from "./firebase";
import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {
  const [stepometer, setStepometer] = useState(null);
  useEffect(() => {
    async function GetStepometer() {
      const querySnapshot = await getDocs(collection(db, "stepometer"));
      const userData = [];

      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() });
      });
      setStepometer(userData);
      return userData;
    }
    GetStepometer();
  }, []);

  return (
    <main className="flex flex-row gap-5">
      <div className="flex flex-col gap-2">
        <h2>Docs ID</h2>
        {stepometer
          ? stepometer.map((user, index) => <div key={index}>{user.id}</div>)
          : "Getting stepometer ...."}
      </div>
      <div className="flex flex-col gap-2">
        <h2>Users Timestamp</h2>
        {stepometer
          ? stepometer.map((user, index) => (
              <div key={index}>
                {user.data.timestamp.toDate().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            ))
          : "Getting stepometer ...."}
      </div>
      <div className="flex flex-col gap-2">
        <h2>Users Step</h2>
        {stepometer
          ? stepometer.map((user, index) => (
              <div key={index}>{user.data.steps}</div>
            ))
          : "Getting stepometer ...."}
      </div>
    </main>
  );
}
