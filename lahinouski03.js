// Assignment 1:
Array.prototype.myFilter = function (filterCallback, customThis) {
  const validParameters = Array.isArray(this) && this.length && typeof filterCallback === 'function';
  const filteredArray = [];

  filterCallback = filterCallback.bind(customThis || this);

  if (validParameters) {
    for (let i = 0; i < this.length; i++) {
      if (filterCallback(this[i], i, customThis || this)) {
        filteredArray.push(this[i]);
      }
    }
  }

  return filteredArray;
}


// Assignment 2:
Array.prototype.myReduce = function (reduceCallback, initialValue) {
  const validParameters = Array.isArray(this) && this.length && typeof reduceCallback === 'function';
  const noInitialValue = initialValue === undefined;
  let reducedValue = noInitialValue ? this[0] : initialValue;

  if (validParameters) {
    for (let i = noInitialValue ? 1 : 0; i < this.length; i++) {
      reducedValue = reduceCallback(reducedValue, this[i], i, this);
    }
  }

  return reducedValue;
}