const state = {
  currentDate: {},
};

const dateObject = new Date();
state.currentDate.year = dateObject.getUTCFullYear();
state.currentDate.month = dateObject.getUTCMonth() + 1;
console.log(state.currentDate);

window.onload = function () {
  document
    .getElementById("next-month")
    .addEventListener("click", nextMonthHandler);
  document
    .getElementById("previous-month")
    .addEventListener("click", previousMonthHandler);
  displayCalendar(state.currentDate);

  document
    .getElementById("select-month")
    .addEventListener("change", selectMonthHandler);
  document
    .getElementById("select-year")
    .addEventListener("change", selectYearHandler);

  populateMonthSelect();
  populateYearSelect();
};

function displayCalendar(currentDate) {
  renderCalendarGrid(currentDate);
}

function renderCalendarGrid(currentDate) {
  const selectMonthElm = document.getElementById("select-month");
  selectMonthElm.innerHTML = `<option value="">${monthName(state.currentDate.month)}</option>`;

  const selectYearElm = document.getElementById("select-year");
  selectYearElm.innerHTML = `<option value="">${state.currentDate.year}</option>`;

  document.getElementById("month-label").textContent =
    `${monthName(currentDate.month)}  ${currentDate.year}`;

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
        cell.textContent = "";
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

function monthName(monthNumber) {
  const month = [
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
  return month[monthNumber - 1];
}

function populateMonthSelect() {
  const selectElm = document.getElementById("select-month");

  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.textContent = monthName(i);
    option.value = i;

    selectElm.append(option);
  }
}

function selectMonthHandler(event) {
  const selectedMonth = Number(event.target.value);
  state.currentDate.month = selectedMonth;
  displayCalendar(state.currentDate);
}
function populateYearSelect() {
  const selectElm = document.getElementById("select-year");

  for (let i = 5; i >= 0; i--) {
    const option = document.createElement("option");
    option.textContent = `${state.currentDate.year - i}`;
    option.value = state.currentDate.year - i;
    selectElm.append(option);
  }
  for (let i = 1; i < 5; i++) {
    const option = document.createElement("option");
    option.textContent = `${state.currentDate.year + i}`;
    option.value = state.currentDate.year + i;
    selectElm.append(option);
  }
}

function selectYearHandler(event) {
  const selectedYear = Number(event.target.value);
  state.currentDate.year = selectedYear;
  displayCalendar(state.currentDate);
  populateYearSelect();
}
