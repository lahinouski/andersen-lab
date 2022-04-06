// Assignment 1:
function makeObjectDeepCopy(objectToClone) {
  const clone = {};

  Object.keys(objectToClone).forEach((key) => {
    if (typeof objectToClone[key] === 'object') {
      clone[key] = makeObjectDeepCopy(objectToClone[key]);
    } else {
      clone[key] = objectToClone[key];
    }
  });

  return clone;
}


// Assignment 2:
function selectFromInterval(numbersArray, indexStart, indexEnd) {
  const invalidIndexes = !Number.isFinite(indexStart) || !Number.isFinite(indexEnd);
  const invalidArray = !Array.isArray(numbersArray) || !allNumbers(numbersArray);

  if (invalidArray) {
    throw new Error('Not an array with numbers');
  } else if (invalidIndexes) {
    throw new Error('Range indexes are not numbers');
  } else if (indexStart > indexEnd) {
    [indexStart, indexEnd] = [indexEnd, indexStart];
  }

  return numbersArray.slice(indexStart - 1, indexEnd);
}

function allNumbers(arrayToCheck) {
  let areOnlyNumbers = true;

  arrayToCheck = Array.from(arrayToCheck);
  arrayToCheck.forEach((element) => !Number.isFinite(element) ? areOnlyNumbers = false : null);

  return areOnlyNumbers;
}


// Assignment 3:
// Make Object Iterable:
const myIterable = {
  from: 2,
  to: 5,

  [Symbol.iterator]() {
    const invalidIndexes = !Number.isFinite(this.from) || !Number.isFinite(this.to) || this.from > this.to;
    const iteratorObject = {
      currentIndex: this.from,
      lastIndex: this.to,
      next() {
        if (this.currentIndex <= this.lastIndex) {
          return { done: false, value: this.currentIndex++ };
        }

        return { done: true };
      }
    };

    if (invalidIndexes) {
      throw new Error('Invalid indexes');
    }

    return iteratorObject;
  }
};

for (const value of myIterable) {
  console.log(value);
} // 2 3 4 5 

// Convert Object to Primitive:
const user = {
  name: "John",
  money: 1000,
  
  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint === "string" ? `{name: "${this.name}"}` : this.money;
  }
};

alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
alert(user); // hint: string -> {name: "John"}