// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import * as Engine from "./common.mjs";

// This waits for the browser to be ready before drawing anything.
window.onload = function () {
  document.getElementById("next-month")
    .addEventListener("click", nextMonthHandler);
  document
    .getElementById("previous-month")
    .addEventListener("click", previousMonthHandler);

  document
    .getElementById("select-month")
    .addEventListener("change", selectMonthHandler);
  document
    .getElementById("select-year")
    .addEventListener("change", selectYearHandler);

  populateMonthSelect();
  populateYearSelect();

  displayCalendar(Engine.state.currentDate);
};

function displayCalendar(currentDate) {
  renderCalendarGrid(currentDate);
}

function renderCalendarGrid(currentDate) {
  //asking the engine for data
  const monthDays = Engine.numberOfDaysInMonth(currentDate);
  const firstWeekday = Engine.dayOfWeekOrder(currentDate);

  //update the Labels and Selects tags
  document.getElementById("month-label").textContent = `${Engine.monthName(currentDate.month)} ${currentDate.year}`;
  document.getElementById("select-month").value = String(currentDate.month);
  document.getElementById("select-year").value = String(currentDate.year);

  //grid logic
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

function nextMonthHandler() {
  Engine.incrementMonth();
  displayCalendar(Engine.state.currentDate);
}

function previousMonthHandler(){
  Engine.decrementMonth();

  displayCalendar(Engine.state.currentDate);
}

function selectMonthHandler(event){
  const selectedMonth = Number(event.target.value);
  Engine.state.currentDate.month = selectedMonth;
  displayCalendar(Engine.state.currentDate);
}

function selectYearHandler(event) {
  const selectedYear = Number(event.target.value);
  Engine.state.currentDate.year = selectedYear;
  populateYearSelect();
  displayCalendar(Engine.state.currentDate);
}

//UI helpers 

function populateMonthSelect() {
  const selectElm = document.getElementById("select-month");
  selectElm.textContent = "";

  for (let m = 1; m <= 12; m++) {
    const option = document.createElement("option");
    option.textContent = Engine.monthName(m);
    option.value = String(m);
    selectElm.append(option);
  }
}


function populateYearSelect() {
  const selectElm = document.getElementById("select-year");
  selectElm.textContent = "";
  const currentYear = Engine.state.currentDate.year;
  for (let y = currentYear - 5; y <= currentYear + 5; y++) {
    const option = document.createElement("option");
    option.textContent = `${y}`;
    option.value = String(y);
    selectElm.append(option);
  }
}

