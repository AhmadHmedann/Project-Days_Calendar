import daysData from "./days.json" with { type: "json" };

export const state = {
  commemorativeDays: daysData,
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

// 2. Math Functions (Exported so the Bridge and Tests can see them)
export function numberOfDaysInMonth({ year, month }) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function dayOfWeekOrder({ year, month }) {
  return new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
}

//calculate the date
function nthWeekdayOfMonthUTC(year, month, weekday, nth) {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const day = 1 + offset + (nth - 1) * 7;

  const resultDate = new Date(Date.UTC(year, month - 1, day));

  if (resultDate.getUTCMonth() === month - 1) {
    return {
      year: resultDate.getUTCFullYear(),
      month: resultDate.getUTCMonth() + 1,
      day: resultDate.getUTCDate(),
    };
  } else {
    return null;
  }
}

function lastWeekdayOfMonthUTC(year, month, weekday) {
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lastWeekday = new Date(Date.UTC(year, month - 1, lastDay)).getUTCDay();
  const back = (lastWeekday - weekday + 7) % 7;
  const day = lastDay - back;

  const resultDate = new Date(Date.UTC(year, month - 1, day));

  return {
    year: resultDate.getUTCFullYear(),
    month: resultDate.getUTCMonth() + 1,
    day: resultDate.getUTCDate(),
  };
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
export function pad2(n) {
  return String(n).padStart(2, "0");
}

export function buildEventsByDateMap(commemorativeDays, year) {
  const map = new Map();

  for (const day of commemorativeDays) {
    const month = monthToNumber[day.monthName];

    const weekday = dayToNumber[day.dayName];

    let dataObj;
    if (day.occurrence === "last") {
      dataObj = lastWeekdayOfMonthUTC(year, month, weekday);
    } else {
      const nth = occurrenceToNth[day.occurrence];
      if (!nth) continue; // or throw error
      dataObj = nthWeekdayOfMonthUTC(year, month, weekday, nth);
      if (!dataObj) continue;
    }

    const key = `${dataObj.year}/${pad2(dataObj.month)}/${pad2(dataObj.day)}`;

    if (!map.has(key)) map.set(key, []);
    map.get(key).push({
      name: day.name,
    });
  }
  return map;
}
