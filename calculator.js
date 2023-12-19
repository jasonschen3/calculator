// Operate function takes in * / - +
function operate(num1, num2, operator) {
  switch (operator) {
    case "*":
      return num1 * num2;
      break;
    case "/":
      return num1 / num2;
      break;
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
  }
}

// Store number into display object
let displayVari = {
  num1: null,
  num2: null,
  operator: null,
  reset: function () {
    this.num1 = null;
    this.num2 = null;
    this.operator = null;
  },
};

// Init vari
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");

// Equals logic
equals.addEventListener("click", () => {
  if (
    displayVari.num1 !== null &&
    displayVari.num2 !== null &&
    displayVari.operator !== null
  ) {
    display.textContent = operate(
      displayVari.num1,
      displayVari.num2,
      displayVari.operator
    );
    // logic for after equals
    displayVari.num1 = parseInt(display.textContent);
    displayVari.num2 = null;
    displayVari.operator = null;
  }
});

// Loop thru numbers and add buttons
const numbersButton = document.querySelectorAll(".number");
numbersButton.forEach((button) => {
  button.addEventListener("click", () => {
    const currentNum = parseInt(button.textContent);

    // Check if operator is set, then operate on first or second number accordingly
    if (displayVari.operator === null) {
      displayVari.num1 =
        displayVari.num1 !== null
          ? displayVari.num1 * 10 + currentNum
          : currentNum;
      display.textContent = displayVari.num1;
    } else {
      displayVari.num2 =
        displayVari.num2 !== null
          ? displayVari.num2 * 10 + currentNum
          : currentNum;

      display.textContent = displayVari.num2;
    }
  });
});

// Add event listeners for operators
const opButtons = document.querySelectorAll(".op");
opButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "+") {
      displayVari.operator = "+";
    } else if (button.textContent === "-") {
      displayVari.operator = "-";
    } else if (button.textContent === "/") {
      displayVari.operator = "/";
    } else if (button.textContent === "*") {
      displayVari.operator = "*";
    }
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  displayVari.reset();
  display.textContent = "0";
});

// Dot logic TODO
const dot = document.querySelector("#dot");
dot.addEventListener("click", () => {});

// Percent logic

// +/- logic
