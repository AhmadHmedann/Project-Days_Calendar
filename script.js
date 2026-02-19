const state = {
  currentDate: {},
};

const dateObject = new Date();
state.currentDate.year = dateObject.getUTCFullYear();
state.currentDate.month = dateObject.getUTCMonth() + 1;
console.log(state.currentDate);

window.onload = function () {
  displayCalendar(state.currentDate);
  nextMonthHandler();
  nextMonthHandler();
};

function displayCalendar(currentDate) {
  renderCalendarGrid(currentDate);
  document
    .getElementById("next-month")
    .addEventListener("click", nextMonthHandler);
  document
    .getElementById("previous-month")
    .addEventListener("click", previousMonthHandler);
}

function renderCalendarGrid(currentDate) {
  const monthDays = numberOfDaysInMonth(currentDate);
  const firstWeekday = dayOfWeekOrder(currentDate);
  const totalDays = monthDays + firstWeekday;
  const rows = Math.ceil(totalDays / 7);

  let remainingDays = firstWeekday;
  let dayCounter = 1;
  const root = document.getElementById("date-container");
  root.textContent = "";
  for (let r = 0; r < rows; r++) {
    const row = document.createElement("div");
    row.setAttribute("role", "row");
    row.className = "week-row";

    for (let c = 0; c < 7; c++) {
      const cell = document.createElement("div");
      cell.setAttribute("role", "gridcell");
      cell.className = "day-cell";

      if (remainingDays > 0) {
        cell.textContent = "";
        cell.classList.add("empty-day");
        remainingDays--;
      } else if (dayCounter > monthDays) {
        cell.textContent = " ";
        cell.classList.add("empty-day");
      } else {
        cell.textContent = dayCounter;
        cell.dataset.date = `${currentDate.year}/${currentDate.month}/${dayCounter}`;
        dayCounter++;
      }
      row.append(cell);
    }
    root.append(row);
  }
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
