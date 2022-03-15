// Assignment 1:
function makeObjectDeepCopy(objectToClone) {
  const clone = {};

  for (const key in objectToClone) {

    if (typeof objectToClone[key] === 'object') {
      clone[key] = makeObjectDeepCopy(objectToClone[key])
    } else {
      clone[key] = objectToClone[key];
    }

  }
  return clone;
}


// Assignment 2:
function selectFromInterval(numbersArray, indexStart, indexEnd) {
  const invalidArray = !Array.isArray(numbersArray) || !allNumbers(numbersArray);
  const invalidStartIndex = typeof indexStart !== 'number' || isNaN(indexStart);
  const invalidEndIndex = typeof indexEnd !== 'number' || isNaN(indexEnd);

  if (invalidArray) {
    throw new Error('Not an array with numbers');
  } else if (invalidStartIndex || invalidEndIndex) {
    throw new Error('Range indexes are not numbers');
  } else {

    if (indexStart > indexEnd) {
      [indexStart, indexEnd] = [indexEnd, indexStart];
    }

    return numbersArray.slice(indexStart - 1, indexEnd);
  }
}

function allNumbers(arrayToCheck) {
  let areOnlyNumbers = true;

  arrayToCheck = Array.from(arrayToCheck);
  arrayToCheck.forEach((element) => {
    const notNumber = typeof element !== 'number' || isNaN(element);

    if (notNumber) {
      areOnlyNumbers = false;
    }
  });
  return areOnlyNumbers;
}


// Assignment 3:
const myIterable = {
  from: 2,
  to: 5,
  [Symbol.iterator]() {
    const invalidFromIndex = typeof this.from !== 'number' || isNaN(this.from) || this.from > this.to;
    const invalidToIndex = typeof this.to !== 'number' || isNaN(this.to);
    const iteratorObject = {
      currentIndex: this.from,
      lastIndex: this.to,
      next() {
        if (this.currentIndex <= this.lastIndex) {
          return { done: false, value: this.currentIndex++ };
        } else {
          return { done: true };
        }
      }
    };

    if (invalidFromIndex || invalidToIndex) {
      throw new Error('Invalid indexes');
    }

    return iteratorObject;
  }
};