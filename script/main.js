function initCalculator() {
  const buttons = document.querySelectorAll(".buttons-calc button");
  const display = document.querySelector(".display-calc");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonTarget = e.target.innerText;
      if (buttonTarget === "DEL") {
        display.innerHTML = deleteScreen(display.innerHTML);
      } else if (buttonTarget === "RESET") {
        display.innerHTML = resetScreen(display.innerHTML);
      } else if (buttonTarget === "=") {
        const result = calculator(display.innerHTML);
        display.innerHTML =
          result === "invalid expression" ? result : formatNumber(result);
      } else if (
        (display.innerHTML === "0" && display.innerHTML.length === 1) ||
        display.innerHTML === "invalid expression"
      ) {
        display.innerHTML = button.innerText;
      } else if (
        buttonTarget === "+" ||
        buttonTarget === "-" ||
        buttonTarget === "x" ||
        buttonTarget === "/"
      ) {
        const lastElementDisplay = display.innerHTML.charAt(
          display.innerHTML.length - 1
        );
        if (operations.indexOf(lastElementDisplay) !== -1) {
          display.innerHTML = display.innerHTML.slice(0, -1) + buttonTarget;
        } else {
          display.innerHTML += button.innerText;
        }
      } else {
        display.innerHTML += button.innerText;
      }
    });
  });
}
const operations = ["+", "-", "x", "/"];

function initCalculatorKeybord() {
  document.addEventListener("keydown", mapKeyboard);
}
const mapKeyboard = (event) => {
  const key = event.key;
  if (keysKeyboard.hasOwnProperty(key)) {
    document.getElementById(keysKeyboard[key]).click();
  }
};
const keysKeyboard = {
  0: "key0",
  1: "key1",
  2: "key2",
  3: "key3",
  4: "key4",
  5: "key5",
  6: "key6",
  7: "key7",
  8: "key8",
  9: "key9",
  0: "key0",
  Delete: "keyDel",
  Backspace: "keyDel",
  "+": "keySum",
  "-": "keySubstraction",
  "*": "keyMultiplication",
  "/": "keyBar",
  ".": "keyDot",
  Enter: "keyEqual",
};
function deleteScreen(displayCurrent) {
  if (displayCurrent.length === 1) {
    displayCurrent = "0";
  } else {
    displayCurrent = displayCurrent.slice(0, -1);
  }
  return displayCurrent;
}
function resetScreen(displayCurrent) {
  return "0";
}
function calculator(displayCurrent) {
  displayCurrent = displayCurrent.replace(/[x]+/g, "*");
  try {
    return eval(displayCurrent);
  } catch (error) {
    return "invalid expression";
  }
}
function formatNumber(number) {
  if (!Number.isInteger(number)) {
    number = number.toFixed(3);
    number = number.toString().replace(/(^0+(?=\d))|(,?0+$)/g, "");
  }
  return number;
}
function themeSelect() {
  const selectOne = document.querySelector("#theme-one");
  const selectTwo = document.querySelector("#theme-two");
  const selectThree = document.querySelector("#theme-three");
  const html = document.querySelector("html");

  selectOne.addEventListener("click", () => {
    html.dataset.theme = "one";
  });
  selectTwo.addEventListener("click", () => {
    html.dataset.theme = "two";
  });
  selectThree.addEventListener("click", () => {
    html.dataset.theme = "three";
  });
}
initCalculator();
initCalculatorKeybord();
themeSelect();
