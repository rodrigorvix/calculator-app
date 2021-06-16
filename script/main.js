function initCalculator() {
  const buttons = document.querySelectorAll('.buttons-calc button');
  const display = document.querySelector('.display-calc');
  let blockExpression = '';

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const buttonTarget = e.target.innerText;

      if (buttonTarget === 'DEL') {
        display.innerHTML = deleteScreen(display.innerHTML);
        blockExpression = display.innerHTML;
      } else if (buttonTarget === 'RESET') {
        display.innerHTML = resetScreen(display.innerHTML);
        blockExpression = display.innerHTML;
      } else if (buttonTarget === '=') {
        const result = calculator(display.innerHTML);
        display.innerHTML =
          result === 'invalid expression' ? result : formatNumber(result);
        blockExpression = display.innerHTML;
      } else if (
        (display.innerHTML === '0' && display.innerHTML.length === 1) ||
        display.innerHTML === 'invalid expression'
      ) {
        display.innerHTML = button.innerText;
        blockExpression = display.innerHTML;
      } else if (buttonTarget === '.') {
        const existDot = blockExpression.indexOf(buttonTarget);

        if (existDot === -1) {
          display.innerHTML += button.innerText;
          blockExpression += button.innerText;
        }
      } else if (
        buttonTarget === '+' ||
        buttonTarget === '-' ||
        buttonTarget === 'x' ||
        buttonTarget === '/'
      ) {
        const lastElementDisplay = display.innerHTML.charAt(
          display.innerHTML.length - 1,
        );
        blockExpression = '';

        if (operations.indexOf(lastElementDisplay) !== -1) {
          display.innerHTML = display.innerHTML.slice(0, -1) + buttonTarget;
        } else {
          display.innerHTML += button.innerText;
        }
      } else {
        display.innerHTML += button.innerText;
        blockExpression += button.innerText;
      }
    });
  });
}
const operations = ['+', '-', 'x', '/'];

function initCalculatorKeybord() {
  document.addEventListener('keydown', mapKeyboard);
}
const mapKeyboard = (event) => {
  const key = event.key;
  if (keysKeyboard.hasOwnProperty(key)) {
    document.getElementById(keysKeyboard[key]).click();
  }
};
const keysKeyboard = {
  0: 'key0',
  1: 'key1',
  2: 'key2',
  3: 'key3',
  4: 'key4',
  5: 'key5',
  6: 'key6',
  7: 'key7',
  8: 'key8',
  9: 'key9',
  0: 'key0',
  Delete: 'keyDel',
  Backspace: 'keyDel',
  '+': 'keySum',
  '-': 'keySubstraction',
  '*': 'keyMultiplication',
  '/': 'keyBar',
  '.': 'keyDot',
  Enter: 'keyEqual',
};
const deleteScreen = (displayCurrent) => {
  if (displayCurrent.length === 1) {
    displayCurrent = '0';
  } else {
    displayCurrent = displayCurrent.slice(0, -1);
  }
  return displayCurrent;
};
const resetScreen = (displayCurrent) => '0';

const calculator = (displayCurrent) => {
  displayCurrent = displayCurrent.replace(/[x]+/g, '*');
  try {
    return eval(displayCurrent);
  } catch (error) {
    return 'invalid expression';
  }
};
const formatNumber = (number) => {
  if (!Number.isInteger(number)) {
    number = number.toFixed(3);
    number = number.toString().replace(/(^0+(?=\d))|(,?0+$)/g, '');
  }
  return number;
};
function themeSelect() {
  const selectOne = document.querySelector('#theme-one');
  const selectTwo = document.querySelector('#theme-two');
  const selectThree = document.querySelector('#theme-three');
  const html = document.querySelector('html');

  html.dataset.theme = localStorage.theme ? localStorage.theme : 'one';

  [selectOne, selectTwo, selectThree].forEach((input) => {
    if (input.getAttribute('id').includes(html.dataset.theme)) {
      input.click();
    }
  });
  selectOne.addEventListener('click', () => {
    html.dataset.theme = 'one';
    localStorage.theme = html.dataset.theme;
  });
  selectTwo.addEventListener('click', () => {
    html.dataset.theme = 'two';
    localStorage.theme = html.dataset.theme;
  });
  selectThree.addEventListener('click', () => {
    html.dataset.theme = 'three';
    localStorage.theme = html.dataset.theme;
  });
}

initCalculator();
initCalculatorKeybord();
themeSelect();
