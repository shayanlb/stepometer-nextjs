"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const LineChart = ({ timestamps, data }) => {
  return (
    <div className="p-2 border">
      <Line
        data={{
          labels: timestamps,
          datasets: [
            {
              data: data,
              borderColor: "white", // Change the line color here
              backgroundColor: "red", // Optional: Set a background color
              borderWidth: 2, // Optional: Set the line width
            },
          ],
        }}
        options={{
          scales: {
            x: {
              title: {
                display: true,
                text: "Time", // Label for the x-axis
              },
            },
            y: {
              title: {
                display: true,
                text: "Value", // Label for the y-axis
              },
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
