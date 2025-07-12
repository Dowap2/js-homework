const PRESSED_CLASSNAME = "is-pressed";
const calculator = document.querySelector(".calculator");
const calculatorDisplay = calculator.querySelector(".calculator__display");
const calculatorKeys = calculator.querySelector(".calculator__keys");

const allKeys = [...calculatorKeys.children];
const operatorKeys = allKeys.filter((k) => k.dataset.buttonType === "operator");
const clearButton = allKeys.find((key) => key.dataset.buttonType === "clear");

calculatorKeys.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const { previousButtonType } = calculator.dataset;
  const { buttonType, key } = button.dataset;
  const result = calculatorDisplay.textContent;

  removePressedClassName();

  switch (buttonType) {
    case "number":
      if (previousButtonType === "operator") {
        calculatorDisplay.textContent = key;
      } else if (previousButtonType === "equal") {
        resetCalculator();
        calculatorDisplay.textContent = key;
      } else {
        calculatorDisplay.textContent = result === "0" ? key : result + key;
      }
      break;

    case "decimal":
      if (!result.includes(".")) {
        calculatorDisplay.textContent = result + ".";
      }
      break;

    case "equal":
      button.classList.add(PRESSED_CLASSNAME);

      let firstValue = calculator.dataset.firstValue;
      let operator = calculator.dataset.operator;
      let secondValue = result;

      if (firstValue && operator) {
        if (previousButtonType === "equal") {
          firstValue = calculatorDisplay.textContent;
          secondValue = calculator.dataset.secondValue;
        } else {
          calculator.dataset.secondValue = secondValue;
        }

        const calcResult = calculate(firstValue, operator, secondValue);
        calculatorDisplay.textContent = calcResult;

        calculator.dataset.firstValue = calcResult;
        calculator.dataset.previousButtonType = "equal";
      }
      break;

    case "operator":
      button.classList.add(PRESSED_CLASSNAME);

      const first = calculator.dataset.firstValue;
      const op = calculator.dataset.operator;
      const second = result;

      if (
        first &&
        op &&
        previousButtonType !== "operator" &&
        previousButtonType !== "equal"
      ) {
        const calcResult = calculate(first, op, second);
        calculatorDisplay.textContent = calcResult;
        calculator.dataset.firstValue = calcResult;
      } else {
        calculator.dataset.firstValue = result;
      }

      calculator.dataset.operator = key;
      calculator.dataset.previousButtonType = "operator";
      break;

    case "clear":
      if (button.textContent === "AC") {
        resetCalculator();
      }

      calculatorDisplay.textContent = "0";
      button.textContent = "AC";
      break;
  }

  if (buttonType !== "clear" && clearButton.textContent === "AC") {
    clearButton.textContent = "CE";
  }

  calculator.dataset.previousButtonType = buttonType;
});

function resetCalculator() {
  delete calculator.dataset.firstValue;
  delete calculator.dataset.operator;
  delete calculator.dataset.secondValue;
  delete calculator.dataset.previousButtonType;
}

function calculate(first, operator, second) {
  const a = parseFloat(first);
  const b = parseFloat(second);

  switch (operator) {
    case "plus":
      return a + b;
    case "minus":
      return a - b;
    case "times":
      return a * b;
    case "divide":
      return a / b;
    default:
      return b;
  }
}

function removePressedClassName() {
  for (const key of operatorKeys) {
    key.classList.remove(PRESSED_CLASSNAME);
  }
}
