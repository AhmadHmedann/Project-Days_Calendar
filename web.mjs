// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import * as Engine from "./common.mjs";

// This waits for the browser to be ready before drawing anything.
window.onload = function () {
  displayCalendar(Engine.state.currentDate);
/*
  //buttons
  const nextBtn = document.getElementById("next-month");
  const prevBtn = document.getElementById("previous-month");
  
  if(nextBtn) {
    nextBtn.onclick = () => {
        Engine.incrementMonth();//calling the increment month function and attaching it to button.
        displayCalendar(Engine.state.currentDate);
    };
    }

    if(prevBtn) {
        prevBtn.onclick = () => {
            Engine.decrementMonth();
            displayCalendar(Engine.state.currentDate);
        };
    }
*/
 };
/* --- 2. THE BRIDGE --- */
// This coordinates between the math and the physical grid.
function displayCalendar(currentDate) {
  renderCalendarGrid(currentDate);
}

/* --- 3. THE CONSTRUCTION CREW --- */
// This is the heavy lifter that creates HTML elements.

function renderCalendarGrid(currentDate) {
  // Note: These math variables come from Engine/common.mjs
  const monthDays = Engine.numberOfDaysInMonth(currentDate);//tries to find out how many days are in a specific month
  const firstWeekday = Engine.dayOfWeekOrder(currentDate);// tries to find out what day of the week does the first fall on.

  const rows = Math.ceil((monthDays + firstWeekday) / 7);

  let remainingDays = firstWeekday;
  let dayCounter = 1;

  //this the hok to our hTML divs
  const root = document.getElementById("date-container");
  if (!root) return;//cheks if we have date container before running the code and returns quick if we dont have one.
  root.textContent= "";//allows you to start on a clean slate everytime a new month is drawn.



  // THE LOOPING LOGIC
  for (let r = 0; r < rows; r++) {
    // CREATING ROWS
    const row = document.createElement("div");
    row.setAttribute("role", "row");
    row.className = "week-row";

    for (let c = 0; c < 7; c++) {
      // CREATING INDIVIDUAL BOXES
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
        // ATTACHING DATA TO HTML
        cell.dataset.date = `${currentDate.year}-${currentDate.month}-${dayCounter}`;
        dayCounter++;
      }
      row.append(cell);
    }
    root.append(row);
  }
}