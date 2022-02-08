const ageCalculator = require("age-calculator");
const { AgeFromDateString, AgeFromDate } = require("age-calculator");

export const calculateAge = (user) => {
  const arr = user.birthday.split("-");
  const year = parseInt(arr[0]);
  const month = parseInt(arr[1]) - 1;
  const day = parseInt(arr[2]);
  let ageFromDate = new AgeFromDate(new Date(year, month, day)).age;
  user.age = ageFromDate;

  return user;
};
