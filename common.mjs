// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.
// 1. State - The Single Source of Truth

import daysData from "./days.json" with { type: "json"};
// import the JSOn file so the Engine can calculate the holidays/ CM days

export const state = {
  currentDate: {
    year: new Date().getUTCFullYear(),
    month: new Date().getUTCMonth() + 1
  }
};

//data helper
export function monthName(monthNumber){
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1]
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
