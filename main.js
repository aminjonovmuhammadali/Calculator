// Global empty variables for calculator
let previousOperand = "";
let currentOperand = "";
let operation = "";
let result = "";

// HTML elements
const previousDisplay = document.querySelector("[data-previous]");
const currentDisplay = document.querySelector("[data-current]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");
const operationButtons = document.querySelectorAll("[data-operation]");
const numberButtons = document.querySelectorAll("[data-number]");

//Numbers
numberButtons.forEach(function (button) {
  button.addEventListener("click", (e) => {
    if (Number(currentOperand) > 10 ** 12) return;
    let number = e.target.textContent;

    // Check if dot is clicked more than one times
    if (number === "." && currentOperand.includes(".")) return;

    // check if 0 is clicked more than 1 time initially
    if (number === "0" && currentOperand === "0") return;

    if (currentOperand === "0" && number !== "0" && number !== ".") {
      currentOperand = number;
    } else {
      currentOperand += number;
    }

    // currentOperand += number;

    currentDisplay.textContent = currentOperand;
  });
});

//Operations
operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //check if any current operand is avaliable
    if (!currentOperand && operation) return;

    operation = e.target.textContent;

    previousOperand = currentOperand;

    previousDisplay.textContent = previousOperand + " " + operation;
    currentOperand = "";

    currentDisplay.textContent = "";
  });
});

// Equal button
equalButton.addEventListener("click", () => {
  if (previousOperand && currentDisplay) {
    compute();
  }
});

function compute() {
  let a = Number(previousOperand);
  let b = Number(currentOperand);

  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "÷":
      result = a / b;
      break;
    default:
      break;
  }
  currentDisplay.textContent = result;
  previousDisplay.textContent = "";
  currentOperand = result;
  previousOperand = "";
  operation = "";
}
// All Clear button
allClearButton.addEventListener("click", allClear);
function allClear() {
  previousDisplay.textContent = "";
  currentDisplay.textContent = "";
  previousOperand = "";
  currentOperand = "";
  operation = "";
  result = "";
}
//Delete button
deleteButton.addEventListener("click", deleteNumber);
function deleteNumber() {
  currentOperand = currentOperand.slice(0, -1);
  currentDisplay.textContent = currentOperand;
}
