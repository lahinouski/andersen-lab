// Assignment 1:
function concatStrings(stringToAdd, separator) {
  const stringsArray = [stringToAdd];

  return function checkNextParameter(nextString) {
    if (typeof nextString === 'string') {
      stringsArray.push(nextString);
      return checkNextParameter;
    }

    return stringsArray.join(typeof separator === 'string' ? separator : '');
  }
}


// Assignment 2:
class Calculator {
  constructor(countFirst, countSecond) {
    
    const invalidCounts = !Number.isFinite(countFirst) || !Number.isFinite(countSecond);

    if (invalidCounts) {
      throw new Error('Invalid parameters');
    }

    this.countFirst = countFirst;
    this.countSecond = countSecond;
    this.setX = this.setX.bind(this);
    this.setY = this.setY.bind(this);
    this.logSum = this.logSum.bind(this);
    this.logMul = this.logMul.bind(this);
    this.logSub = this.logSub.bind(this);
    this.logDiv = this.logDiv.bind(this);
  }

  checkNewCount(countToCheck) {
    const invalidNewCount = !Number.isFinite(countToCheck);

    if (invalidNewCount) {
      throw new Error('Invalid parameter');
    }
  }

  setX(newCount) {
    this.checkNewCount(newCount);
    this.countFirst = newCount;
  }

  setY(newCount) {
    this.checkNewCount(newCount);
    this.countSecond = newCount;
  }

  logSum() {
    console.log(this.countFirst + this.countSecond);
  }

  logMul() {
    console.log(this.countFirst * this.countSecond);
  }

  logSub() {
    console.log(this.countFirst - this.countSecond);
  }

  logDiv() {
    if (this.countSecond === 0) {
      throw new Error('Can\'t divide by zero');
    }

    console.log(this.countFirst / this.countSecond);
  }
}