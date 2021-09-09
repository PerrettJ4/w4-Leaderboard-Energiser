createFormTable();
createTableSum();
createTableBy("Gartic");
// helper fucntion for table
function createTableEntry(item, classname = "table") {
  let tableEntry = document.createElement("td");
  tableEntry.classList.add(classname + "-entry");
  if (typeof item === "integer") {
    tableEntry.innerText = Number(item);
  }
  tableEntry.innerText = item;
  return tableEntry;
}

// making the table of everything seperated
async function createTableSum() {
  console.log("creating table");
  const data = await getData();
  let tbody = document.querySelector("#leaderboard-body");
  let nameList = [];
  for (element of data) {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("leaderboard-row");
    const { id, name, score, day, energiser } = element;
    // Checking if name exist to total up the scores
    let entries = document.querySelectorAll(".leaderboard-entry");
    entries = Array.from(entries);
    if (nameList.includes(name)) {
      // then find entry and add the score
      // starting at 2 the column and addin  multiples of four is the name
      for (let i = 0; i < entries.length; i += 2) {
        if (name === entries[i].innerText) {
          entries[i + 1].innerText =
            Number(entries[i + 1].innerText) + Number(score);
        }
      }
    } else {
      let classname = "leaderboard";
      tableRow.dataset.id = id;
      // tableRow.appendChild(createTableEntry(formatDate(day)));
      // tableRow.appendChild(createTableEntry(energiser));
      tableRow.appendChild(createTableEntry(name, classname));
      nameList.push(name);
      tableRow.appendChild(createTableEntry(Number(score), classname));
      tbody.appendChild(tableRow);
    }
  }
  // call helper function to sort data maybe
  return;
}

// removes all table rows
function removeAllTableRows() {
  let table = document.querySelector("#filtered-table");
  let tbody = document.querySelector(".filtered-table-body");
  table.removeChild(tbody);
}

// making a table of select by game (Gartic)
// const garticButton = document.createElement("button")

async function createTableBy(energiserFilter) {
  removeAllTableRows();
  const data = await getData();
  let table = document.querySelector("#filtered-table");
  let tbody = document.createElement("tbody");
  tbody.classList.add("filtered-table-body");
  table.appendChild(tbody);
  for (element of data) {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("filtered-table-row");
    const { id, name, score, day, energiser } = element;
    if (energiser === energiserFilter) {
      let classname = "filtered-table";
      tableRow.dataset.id = id;
      tableRow.appendChild(createTableEntry(formatDate(day, classname)));
      tableRow.appendChild(createTableEntry(energiser, classname));
      tableRow.appendChild(createTableEntry(name, classname));
      tableRow.appendChild(createTableEntry(score, classname));
      tbody.appendChild(tableRow);
    }
  }
}

function formatDate(date) {
  try {
    return date.split(/\n/).join("");
  } catch {
    return "Date unrecorded";
  }
}

// // now list them in order of priority
// function orderAscending(ob1, ob2) {
//   num1 = ob1.priority;
//   num2 = ob2.priority;
//   return num1 - num2;
// }

// async fetch and await data from default route localhost 3000 (argument = )
// await response
// enter in table creation functions
// return payload
// pas into create tabkle function

async function getData() {
  const response = await fetch(
    "https://leaderboard-energiser-app.herokuapp.com/scores"
  );
  console.log(response);
  const data = await response.json();
  console.log(data);

  return data.payload;
}

/* Plan for post request */
/* 
  Select all input fields and save them to variables
  
  Write an async function to send data to server
  Store the values of the input fields as an object
  Send the object to the database as a post request and await the response
  
  Add an event listener to the Submit button to call the function
  */

const nameField = document.querySelector("#name");
const energiserField = document.querySelector("#energiser");
const scoreField = document.querySelector("#score");
const dateField = document.querySelector("#date");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", addScore);

async function addScore(event) {
  event.preventDefault();
  const scoreData = {
    name: nameField.value,
    day: dateField.value,
    energiser: energiserField.value,
    score: scoreField.value,
  };
  console.log(scoreData);
  const response = await fetch(
    "https://leaderboard-energiser-app.herokuapp.com/scores",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    }
  );
  console.log(response);
}

// CREATING THE FORM TABLE
async function createFormTable() {
  console.log("creating form table");
  const data = await getData();
  let tbody = document.querySelector("#form-table-body");
  let nameList = [];
  let position = 1;
  let points = 20;
  for (element of data) {
    let tableRow = document.createElement("tr");
    tableRow.classList.add("form-table-row");
    const { name } = element;
    // Checking if name exist to total up the scores
    let entries = document.querySelectorAll(".form-table-entry");
    entries = Array.from(entries);
    if (nameList.includes(name)) {
      continue;
    } else {
      let classname = "form-table";
      tableRow.appendChild(createTableEntry(position, classname));
      tableRow.appendChild(createTableEntry(name, classname));
      tableRow.appendChild(createTableEntry(points, classname));
      position++;
      points--;
      nameList.push(name);
      tbody.appendChild(tableRow);
    }
  }
  const allRows = document.querySelectorAll(".form-table-row");
  // call helper function to sort data maybe
  return fireDraggableSystem(allRows);
}
// FORM TABLE DRAGGING SYSTEM
// need position and score to be inverese of each other
const formTable = document.querySelectorAll("#form-table-body");
let draggingEle; // The dragging element
let draggingRowIndex; // The index of dragging row

const mouseDownHandler = function (e) {
  "mouse DOWN";
  const allRows = document.querySelectorAll(".form-table-row");
  // Get the original row
  const originalRow = e.target.parentNode;
  draggingRowIndex = [].slice.call(allRows).indexOf(originalRow);
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};
let isDraggingStarted = false;
const mouseMoveHandler = function (e) {
  console.log("2");
  // const list = document.querySelectorAll(".div");
  if (!isDraggingStarted) {
    cloneTable();

    // Query the dragging element
    draggingEle = [].slice.call(list.children)[draggingRowIndex];
  }
};

let list;
const mouseUpHandler = function () {
  console.log("mouse UP");
  // Move the dragged row to `endRowIndex`
  // const list = document.querySelectorAll(".div");
  const allRows = document.querySelectorAll(".form-table-row");
  let rows = [].slice.call(allRows);
  const endRowIndex = [].slice.call(list.children).indexOf(draggingEle);
  draggingRowIndex > endRowIndex
    ? // User drops to the top
      rows[endRowIndex].parentNode.insertBefore(
        rows[draggingRowIndex],
        rows[endRowIndex]
      )
    : // User drops to the bottom
      rows[endRowIndex].parentNode.insertBefore(
        rows[draggingRowIndex],
        rows[endRowIndex].nextSibling
      );
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};
let tableRowsTest = document.querySelectorAll(".form-table-row");
// console.log(document.querySelectorAll("#form-table"));
// console.log(formTable[0].children);

// console.log(formTable[0].querySelectorAll(".form-table-row"));
// console.log(allRows);
function fireDraggableSystem(allRows) {
  for (element of formTable[0].children) {
    // Ignore the header
    // We don't want user to change the order of header

    // Get the first cell of row
    const firstCell = element.firstElementChild;
    firstCell.classList.add("draggable");
    // Attach event handler
    firstCell.addEventListener("mousedown", mouseDownHandler);
  }
}

const cloneTable = function () {
  console.log("Cloning Table");
  // Get the bounding rectangle of table
  const table = document.querySelector("#form-table");
  const rect = table.getBoundingClientRect();

  // Get the width of table
  const width = parseInt(window.getComputedStyle(table).width);

  // Create new element
  list = document.createElement("div");
  list.classList = "div";

  // Set the same position as table
  list.style.position = "absolute";
  list.style.left = `${rect.left}px`;
  list.style.top = `${rect.top}px`;

  // Insert it before the table
  table.parentNode.insertBefore(list, table);

  // Hide the table
  table.style.visibility = "hidden";

  // Loop over the rows
  const allRows = document.querySelectorAll(".form-table-row");
  allRows.forEach(function (row) {
    const item = document.createElement("div");
    const newTable = document.createElement("table");
    const newRow = document.createElement("tr");

    // Query the cells of row
    const cells = [].slice.call(row.children);
    cells.forEach(function (cell) {
      const newCell = cell.cloneNode(true);
      newCell.style.width = `${parseInt(
        window.getComputedStyle(cell).width
      )}px`;
      newRow.appendChild(newCell);
    });

    newTable.appendChild(newRow);
    item.appendChild(newTable);

    list.appendChild(item);
  });
};
