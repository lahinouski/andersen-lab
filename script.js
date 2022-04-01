const display = document.querySelector('.calculator_display');
const operatorsList = document.querySelectorAll('.operator');
const digitsList = document.querySelectorAll('.digit');
const toggleKey = document.querySelector('.btn-toggle');
const equalKey = document.querySelector('.btn-equal');
const clearKey = document.querySelector('.btn-clear');
const undoKey = document.querySelector('.btn-undo');
let displayedCount = '0';
let memoizedCount;
let lastKeyType;
let operator;

const reRenderAcKey = () => clearKey.textContent = display.textContent === '0' ? 'AC' : 'C';

const equalKeyCallback = () => calculate();

const digitKeyCallback = (event) => {
  const isDecimalKey = event.target.classList.contains('btn-decimal');
  const digit = event.target.textContent;

  switch (isDecimalKey) {
    case true:
      if (lastKeyType === 'operator') displayedCount = '0.';
      else displayedCount = displayedCount.includes('.') ? displayedCount : displayedCount + '.';
      break;

    default:
      if (displayedCount === '-0') displayedCount = '-' + digit;
      else if (display.textContent === '0' || lastKeyType === 'operator') displayedCount = digit;
      else if (displayedCount + digit === '00') displayedCount = '0';
      else displayedCount += digit;
  }

  display.textContent = displayedCount;
  lastKeyType = 'digit';
  adoptDisplayFontSize(display.textContent.length);
  reRenderAcKey();
};

const operatorKeyCallback = (event) => {
  if (operator && lastKeyType === 'digit') calculate();
  if (!memoizedCount) memoizedCount = displayedCount;

  if (event.target.classList.contains('btn-add')) operator = 'add';
  else if (event.target.classList.contains('btn-subtract')) operator = 'subtract';
  else if (event.target.classList.contains('btn-multiply')) operator = 'multiply';
  else operator = 'divide';

  lastKeyType = 'operator';
};

const clearKeyCallback = () => {
  display.textContent = '0';
  displayedCount = '0';
  memoizedCount = null
  lastKeyType = null;
  operator = null;
  adoptDisplayFontSize(display.textContent.length);
  reRenderAcKey();
};

const toggleKeyCallback = () => {
  if (display.textContent === 'Error') return;
  if (lastKeyType === 'operator') display.textContent = '0';

  displayedCount = display.textContent.includes('-') ? display.textContent.slice(1) : '-' + display.textContent;
  display.textContent = displayedCount;
};

const undoKeyCallback = () => {
  if (display.textContent === 'Error') return;
  if (display.textContent.includes('+')) return;
  if (display.textContent === '0') return;
  if (display.textContent === '-0') return;
  if (display.textContent === '0.') display.textContent = '0';
  if (display.textContent === '-0.') display.textContent = '-0';
  if (display.textContent.endsWith('.')) displayedCount = display.textContent.slice(0, -2);
  else if (display.textContent.includes('-') && display.textContent.length === 2) displayedCount = '-0';
  else displayedCount = display.textContent.length > 1 ? display.textContent.slice(0, -1) : 0;

  display.textContent = displayedCount;
  adoptDisplayFontSize(display.textContent.length);
  reRenderAcKey();
};

const calculate = () => {
  const countFirst = parseFloat(memoizedCount);
  const countSecond = parseFloat(displayedCount);
  let temp;

  if (!memoizedCount || !displayedCount) return;
  if (operator === 'add') temp = (countFirst + countSecond).toFixed(8).replace(/0*$/, "").replace(/\.$/, "");
  if (operator === 'subtract') temp = (countFirst - countSecond).toFixed(8).replace(/0*$/, "").replace(/\.$/, "");
  if (operator === 'multiply') temp = (countFirst * countSecond).toFixed(8).replace(/0*$/, "").replace(/\.$/, "");
  if (operator === 'divide') temp = (countFirst / countSecond).toFixed(8).replace(/0*$/, "").replace(/\.$/, "");

  if (!Number.isFinite(parseFloat(temp))) {
    memoizedCount = null;
    display.textContent = 'Error';
  } else {
    [memoizedCount, display.textContent] = [temp, temp];
    lastKeyType = 'operator';
  }

  adoptDisplayFontSize(display.textContent.length);
};

const adoptDisplayFontSize = (sringLength) => {
  if (sringLength < 7) {
    display.style.fontSize = "2.5em";
    display.style.padding = "0.1em 0.2em";
  }

  if (sringLength >= 8) {
    display.style.fontSize = "1.9em";
    display.style.padding = "0.25em 0.2em";
  }

  if (sringLength >= 11) {
    display.style.fontSize = "1.6em";
    display.style.padding = "0.35em 0.2em";
  }

  if (sringLength > 12) {
    display.style.fontSize = "1.0675em";
    display.style.padding = "0.7em 0.2em";
  }
};

digitsList.forEach((digitKey) => digitKey.addEventListener('click', digitKeyCallback));
operatorsList.forEach((operatorKey) => operatorKey.addEventListener('click', operatorKeyCallback));
toggleKey.addEventListener('click', toggleKeyCallback);
equalKey.addEventListener('click', equalKeyCallback);
clearKey.addEventListener('click', clearKeyCallback);
undoKey.addEventListener('click', undoKeyCallback);