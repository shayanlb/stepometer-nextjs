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
import sendDataToFirestore from "../components/sendDataToFirestore";

export default function Home() {
  const [stepometer, setStepometer] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [filterOption, setFilterOption] = useState("all");
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function GetStepometer() {
      let sendData = await sendDataToFirestore();
      const querySnapshot = await getDocs(
        collection(db, sendData.firestore_collection_name_normal)
      );
      const querySnapshot_left = await getDocs(
        collection(db, sendData.firestore_collection_name_left)
      );
      const querySnapshot_right = await getDocs(
        collection(db, sendData.firestore_collection_name_right)
      );
      const userData = [];

      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() });
      });
      querySnapshot_left.forEach((doc) => {
        userData.push({ id: doc.id, data: doc.data() });
      });
      querySnapshot_right.forEach((doc) => {
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
  const Heading = ({ children }) => {
    return (
      <h2 className="border-b-2 p-2 flex-1">
        <span>{children}</span>
      </h2>
    );
  };

  return (
    <main className="p-3">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="py-2">
          <label htmlFor="startDatePicker" className="py-2">
            Start Date:
          </label>
          <DatePicker
            id="startDatePicker"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="MM/dd/yyyy"
            className="dark:bg-gray-700 mx-2"
          />
        </div>

        <div className="py-2">
          <label htmlFor="endDatePicker" className="py-2">
            End Date:
          </label>
          <DatePicker
            id="endDatePicker"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="MM/dd/yyyy"
            className="dark:bg-gray-700 mx-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
      <h1>Table</h1>
      <div className="flex flex-row border text-sm justify-between">
        <div className="sm:flex flex-col gap-2 hidden">
          <Heading>Docs IDs</Heading>

          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
                  {user.id}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <Heading>Timestamp</Heading>

          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
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
          <Heading>Step</Heading>

          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
                  {user.data.steps}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <Heading>Pressure Left</Heading>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
                  {user.data.pressure_left}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="flex flex-col gap-2">
          <Heading>Pressure Right</Heading>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
                  {user.data.pressure_right}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
        <div className="hidden sm:flex flex-col gap-2">
          <Heading>Pressure Difference</Heading>

          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
                  {user.data.pressure_right - user.data.pressure_left > 0
                    ? user.data.pressure_right - user.data.pressure_left
                    : user.data.pressure_left - user.data.pressure_right}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>

        <div className="flex flex-col gap-2">
          <Heading> Status</Heading>
          {filteredStepometer
            ? filteredStepometer.map((user, index) => (
                <div key={index} className="text-center">
                  {user.data.status}
                </div>
              ))
            : "No matching data for the selected filter."}
        </div>
      </div>
    </main>
  );
}
