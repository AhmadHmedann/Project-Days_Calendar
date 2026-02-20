// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.
// 1. State - The Single Source of Truth

import daysData from "./days.json" with { type: "json" };
// import the JSOn file so the Engine can calculate the holidays/ CM days

export const state = {
  currentDate: {
    year: new Date().getUTCFullYear(),
    month: new Date().getUTCMonth() + 1,
  },
};

//data helper
export function monthName(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1];
}

// 2. Math Functions (Exported so the Bridge and Tests can see them)
export function numberOfDaysInMonth({ year, month }) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function dayOfWeekOrder({ year, month }) {
  return new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
}

// 3. Navigation Logic (Purely updating data)
export function incrementMonth() {
  if (state.currentDate.month === 12) {
    state.currentDate.month = 1;
    state.currentDate.year++;
  } else {
    state.currentDate.month++;
  }
}

export function decrementMonth() {
  if (state.currentDate.month === 1) {
    state.currentDate.month = 12;
    state.currentDate.year--;
  } else {
    state.currentDate.month--;
  }
}

const monthToNumber = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const dayToNumber = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
const occurrenceToNth = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
};

//calculate the date
function nthWeekdayOfMonthUTC(year, month, weekday, nth) {
  const firstDay = new Date(Date.UTC(year, month, 0)).getUTCDate(); //first day in the month
  const offset = (weekday - firstDay + 7) % 7; //How many days I need to move to reach the first weekday
  const day = 1 + offset + (nth - 1) * 7;
  return { year, month, day }; //Look at the example below
}

//same previous function but here when the say the last Friday by example
function lastWeekdayOfMonthUTC(year, month, weekday) {
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lastWeekday = new Date(Date.UTC(year, month - 1, lastDay)).getUTCDay(); // what day of the week is the last day of month (0-6)
  const back = (lastWeekday - weekday + 7) % 7; // how many days we must go back from the last day to reach target weekday
  const day = lastDay - back;
  return { year, month, day };
}

// {
//         "name": "Ada Lovelace Day",
//         "monthName": "October",
//         "dayName": "Tuesday",
//         "occurrence": "second",
//         "descriptionURL": "https://codeyourfuture.github.io/The-Piscine/days/ada.txt"
//     }

// our day is Tuesday that mean weekday is 2
// let's take the October 2026 as example
// fist day is Thursday
// fistday =4 ;
//offset  = (2-4+7)%7 = 5 that mean I need 5 day to reach first Tuesday
// day = 1+offset + (7 because is the second Tuesday)

// the return will be (year:2026, month:10, day:13,)  13/10/2026

function pad2(num) {
  return String(num).padStart(2, "0");
}

function buildEventsByDateMap(commemorativeDays, year) {
  const map = new Map();

  for (const day of commemorativeDays) {
    const month = monthToNumber[day.monthName];
    const weekday = dayToNumber[day.dayName];
    console.log(weekday);

    let dataObj;
    if (day.occurrence === "last") {
      dateObject = lastWeekdayOfMonthUTC(year, month, weekday);
    } else {
      const nth = occurrenceToNth[day.occurrence];
      if (!nth) return; // or throw error
      dataObj = nthWeekdayOfMonthUTC(year, month, weekday);
    }

    const key = `${dataObj.year}/${pad2(dataObj.month)}/${pad2(dataObj.day)}`;

    if(!map.has(key)) map.set(key,[]);
    map.get(key).push({
      name: day.name,
    });
  }
  return map;
}
