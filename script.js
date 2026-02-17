const state = {
  currentDate: {},
};

const dateObject = new Date();
state.currentDate.year = dateObject.getUTCFullYear();
state.currentDate.month = dateObject.getUTCMonth() + 1;
console.log(state.currentDate);

window.onload = function () {
  displayCalendar(state.currentDate);
  nextMonthHandler(); //test
  nextMonthHandler(); //test
  previousMonthHandler(); //test
};

function displayCalendar(currentDate) {
  const monthDays = numberOfDaysInMonth(currentDate);
  const firstDayOfWeekOrder = dayOfWeekOrder(currentDate);
  console.log(monthDays); //test
  console.log(firstDayOfWeekOrder); //test
  // document.getElementById("next-month").addEventListener("click", nextMonthHandler);
  // document.getElementById("previous-month").addEventListener("click", previousMonthHandler);
}

function numberOfDaysInMonth({ year, month }) {
  //   return new Date(year, month, 0).getDate();  here I will take my system timezone
  //day 0 does not exist, so JS go back one day which the last day of previous month

  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}
function dayOfWeekOrder({ year, month }) {
  //in JS Jan=0,,,,,,Des=11;

  return new Date(Date.UTC(year, month - 1, 1)).getUTCDay(); //Which day of the week is this date?
  // that will return numbers from 0 to 6
  //Sun:0 , Mon:1 ,,,,,,,,,Sat:6
}

function nextMonthHandler() {
  if (state.currentDate.month === 12) {
    state.currentDate.month = 1;
    state.currentDate.year++;
  } else {
    state.currentDate.month++;
  }
  displayCalendar(state.currentDate);
}

function previousMonthHandler() {
  if (state.currentDate.month === 1) {
    state.currentDate.month = 12;
    state.currentDate.year--;
  } else {
    state.currentDate.month--;
  }
  displayCalendar(state.currentDate);
}
