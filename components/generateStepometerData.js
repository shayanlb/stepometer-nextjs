import { serverTimestamp } from "firebase/firestore";

const generateStepometerData = (
  minimum_step_count,
  maximum_step_count,
  pressure_left,
  pressure_right,
  time_difference
) => {
  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateStep = () =>
    generateRandomNumber(minimum_step_count, maximum_step_count);

  const generatePressureLeft = (step) => {
    if (step === 0) {
      if (generateRandomNumber(0, 1) === 0) {
        return 0;
      } else {
        return generateRandomNumber(pressure_left, pressure_right);
      }
    } else {
      return generateRandomNumber(pressure_left, pressure_right);
    }
  };

  const generatePressureRight = (pressureLeft) => {
    if (pressureLeft === 0) {
      return 0;
    } else {
      return 100 - pressureLeft;
    }
  };

  const generateStatus = (pressureLeft, pressureRight) => {
    if (pressureLeft === 0 && pressureRight === 0) {
      return "fail";
    } else {
      return "success";
    }
  };
  function normal_timestamp(time_difference) {
    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    currentDate.setSeconds(currentDate.getSeconds() + time_difference.seconds);
    currentDate.setDate(currentDate.getDate() + time_difference.day);
    return currentDate;
  }
  const step = generateStep();
  const pressureLeft = generatePressureLeft(step);
  const pressureRight = generatePressureRight(pressureLeft);
  const status = generateStatus(pressureLeft, pressureRight);

  return {
    pressure_left: pressureLeft,
    pressure_right: pressureRight,
    timestamp: normal_timestamp(time_difference),
    steps: step,
    status: status,
  };
};

export default generateStepometerData;
