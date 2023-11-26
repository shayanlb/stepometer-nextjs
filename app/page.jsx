"use client";

import { db } from "./firebase";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // Import date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import LineChart from "../components/LineChart";
export default function Home() {
  const [stepometer, setStepometer] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [filterOption, setFilterOption] = useState("all");
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function GetStepometer() {
      // const generateRandomNumber = (min, max) =>
      //   Math.floor(Math.random() * (max - min + 1)) + min;

      // const generateStep = () => generateRandomNumber(0, 12);

      // const generatePressureLeft = (step) => {
      //   if (step === 0) {
      //     return generateRandomNumber(25, 35);
      //   } else {
      //     return generateRandomNumber(25, 35);
      //   }
      // };

      // const generatePressureRight = (step, pressureLeft) => {
      //   if (step === 0) {
      //     return 0;
      //   } else {
      //     return 100 - pressureLeft;
      //   }
      // };

      // const generateStatus = (step, pressureLeft, pressureRight) => {
      //   if (step === 0) {
      //     return pressureLeft === 0 && pressureRight === 0 ? "fail" : "success";
      //   } else {
      //     return "success";
      //   }
      // };

      // const generateStepometerData = () => {
      //   const step = generateStep();
      //   const pressureLeft = generatePressureLeft(step);
      //   const pressureRight = generatePressureRight(step, pressureLeft);
      //   const status = generateStatus(step, pressureLeft, pressureRight);

      //   return {
      //     pressure_left: pressureLeft,
      //     pressure_right: pressureRight,
      //     timestamp: serverTimestamp(), // Replace normal_timestamp with the actual timestamp logic
      //     steps: step,
      //     status: status,
      //   };
      // };

      // const docRef = await addDoc(
      //   collection(db, "stepometer"),
      //   generateStepometerData()
      // );
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

  const filteredStepometer = stepometer?.filter((user) => {
    const userDate = user.data.timestamp.toDate();
    const isDateInRange =
      (startDate ? userDate >= startDate : true) &&
      (endDate ? userDate <= endDate : true);

    switch (filterOption) {
      case "days":
        return (
          isDateInRange &&
          userDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
      case "months":
        return (
          isDateInRange &&
          userDate > new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
        );
      default:
        return isDateInRange;
    }
  });
  // Sort filteredStepometer based on timestamp in descending order
  const sortedStepometer = filteredStepometer?.sort(
    (a, b) => a.data.timestamp.toMillis() - b.data.timestamp.toMillis()
  );

  let timestamp = [];
  let step = [];
  let pressure_left = [];
  let pressure_right = [];
  let status = [];
  let pressure_difference = [];
  sortedStepometer?.forEach((user) => {
    timestamp.push(
      user.data.timestamp.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
    step.push(user.data.steps);
    status.push(user.data.status === "success" ? 1 : 0); // Convert status to 1 for success, 0 for fail
    pressure_right.push(user.data.pressure_right);
    pressure_left.push(user.data.pressure_left);

    // Corrected pressure_difference calculation using ternary operator
    pressure_difference.push(
      user.data.pressure_right - user.data.pressure_left > 0
        ? user.data.pressure_right - user.data.pressure_left
        : user.data.pressure_left - user.data.pressure_right
    );
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <main className="p-3">
      <div className="flex flex-row gap-5">
        <div className="py-2">
          <label htmlFor="startDatePicker" className="p-2">
            Start Date:
          </label>
          <DatePicker
            id="startDatePicker"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="MM/dd/yyyy"
            className="dark:bg-gray-700"
          />
        </div>

        <div className="py-2">
          <label htmlFor="endDatePicker" className="p-2">
            End Date:
          </label>
          <DatePicker
            id="endDatePicker"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="MM/dd/yyyy"
            className="dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 p-2 border">
        <div className="flex flex-col gap-2">
          <h2>Docs ID</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>{user.id}</div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Users Timestamp</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>
                  {user.data.timestamp.toDate().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Users Step</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>{user.data.steps}</div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Users Pressure Left</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>{user.data.pressure_left}</div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Users Pressure Right</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>{user.data.pressure_right}</div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Users Pressure Difference</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>
                  {user.data.pressure_right - user.data.pressure_left > 0
                    ? user.data.pressure_right - user.data.pressure_left
                    : user.data.pressure_left - user.data.pressure_right}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <h2>Users Status</h2>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index}>{user.data.status}</div>
              ))
            : "No matching data for the selected filter."}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <h2>Steps</h2>
          <LineChart timestamps={timestamp} data={step} />
        </div>
        <div>
          <h2>status</h2>
          <LineChart timestamps={timestamp} data={status} />
        </div>
        <div>
          <h2>pressure_right</h2>
          <LineChart timestamps={timestamp} data={pressure_right} />
        </div>
        <div>
          <h2>pressure_left</h2>
          <LineChart timestamps={timestamp} data={pressure_left} />
        </div>
        <div>
          <h2>pressure_difference</h2>
          <LineChart timestamps={timestamp} data={pressure_difference} />
        </div>
      </div>
    </main>
  );
}
