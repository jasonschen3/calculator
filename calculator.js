// Operate function takes in * / - + and gives precision calculation
function operate(num1, num2, operator) {
  switch (operator) {
    case "*":
      return strip(num1 * num2 * 1.0);
      break;
    case "/":
      return strip(num1 / num2 / 1.0);
      break;
    case "+":
      return strip(num1 + num2);
      break;
    case "-":
      return strip(num1 - num2);
      break;
  }
}
// Helper for precision
function strip(number) {
  return parseFloat(number.toPrecision(10));
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
    justPressedEquals = false;
    isDot = false;
    dotFactor = 0.1;
  },
};

// Init vari
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");

// Equals logic
let justPressedEquals = false; // Used for dot logic
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
    displayVari.num1 = parseFloat(display.textContent);
    displayVari.num2 = null;
    displayVari.operator = null;
    isDot = false;
    dotFactor = 0.1;
    justPressedEquals = true;
  }
});

// Loop thru numbers to add buttons for each 0123456789
// Added dot logic here too
const numbersButton = document.querySelectorAll(".number");
let isDot = false;
let dotFactor = 0.1;
numbersButton.forEach((button) => {
  button.addEventListener("click", () => {
    const currentNum = parseInt(button.textContent);

    // Check if just pressed equals and no operator is pressed
    if (displayVari.operator === null && justPressedEquals) {
      displayVari.reset();
    }
    // Limit number of digits
    if (displayVari.operator === null && display.textContent.length === 9) {
      return;
    }
    // Check if operator is set, then operate on first or second number accordingly
    if (displayVari.operator === null) {
      if (!isDot) {
        displayVari.num1 =
          displayVari.num1 !== null
            ? displayVari.num1 * 10 + currentNum
            : currentNum;
        display.textContent = displayVari.num1;
      } else {
        // Already initialized when clicked dot
        displayVari.num1 += currentNum * dotFactor;
        dotFactor *= 0.1;

        // edge case of zero
        if (currentNum === 0) {
          display.textContent += "0";
        } else {
          display.textContent = displayVari.num1;
        }
      }
    } else {
      if (!isDot) {
        displayVari.num2 =
          displayVari.num2 !== null
            ? displayVari.num2 * 10 + currentNum
            : currentNum;
        display.textContent = displayVari.num2;
      } else {
        displayVari.num2 += strip(currentNum * dotFactor);
        dotFactor *= 0.1;

        // edge case of zero
        if (currentNum === 0) {
          display.textContent += "0";
        } else {
          display.textContent = displayVari.num2;
        }
      }
    }
  });
});

// Add event listeners for operators +-/*
const opButtons = document.querySelectorAll(".op");
opButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "+") {
      displayVari.operator = "+";
      isDot = false;
      dotFactor = 0.1;
    } else if (button.textContent === "-") {
      displayVari.operator = "-";
      isDot = false;
      dotFactor = 0.1;
    } else if (button.textContent === "/") {
      displayVari.operator = "/";
      isDot = false;
      dotFactor = 0.1;
    } else if (button.textContent === "*") {
      displayVari.operator = "*";
      isDot = false;
      dotFactor = 0.1;
    }
  });
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  displayVari.reset();
  display.textContent = "0";
});

// Dot logic
const dot = document.querySelector("#dot");
dot.addEventListener("click", () => {
  // Check to see if we need a new number after equals
  if (displayVari.operator === null && justPressedEquals) {
    displayVari.reset();
  }
  if (
    displayVari.num1 !== null &&
    displayVari.operator !== null &&
    displayVari.num2 === null
  ) {
    displayVari.num2 = 0;
    display.textContent = displayVari.num2 + ".";
  }
  // Add the dot to DOM
  if (!isDot && !display.textContent.includes(".")) {
    display.textContent += ".";
    isDot = true;
  }
  isDot = true;

  // Make sure num is initialized
  if (displayVari.num1 === null) {
    displayVari.num1 = 0;
    display.textContent = displayVari.num1 + ".";
  } else if (displayVari.operator !== null && num2 === null) {
    displayVari.num2 = 0;
    display.textContent = displayVari.num2 + ".";
  }
});

// Percent logic
const percent = document.querySelector("#percent");
percent.addEventListener("click", () => {
  if (displayVari.num1 !== null && displayVari.operator === null) {
    displayVari.num1 *= 0.01;
    display.textContent = displayVari.num1;
    isDot = true;
    dotFactor *= 0.01;
  } else if (displayVari.num2 !== null && displayVari.operator !== null) {
    displayVari.num2 *= 0.01;
    display.textContent = displayVari.num2;
    isDot = true;
    dotFactor *= 0.01;
  }
});

// +/- logic
const sign = document.querySelector("#sign");
sign.addEventListener("click", () => {
  if (displayVari.num1 !== null && displayVari.operator === null) {
    displayVari.num1 *= -1;
    display.textContent = displayVari.num1;
  } else if (displayVari.num2 !== null && displayVari.operator !== null) {
    displayVari.num2 *= -1;
    display.textContent = displayVari.num2;
  }
});
