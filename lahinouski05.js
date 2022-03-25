// Assignment 1:
class Stack {
  constructor(stackMaxSize = 10) {
    const invalidStackIndex = !Number.isFinite(stackMaxSize) || stackMaxSize <= 0 || stackMaxSize % 1 !== 0;

    if (invalidStackIndex) {
      throw new Error('Invalid stack size');
    }

    this.stackMaxSize = stackMaxSize;
    this.stackCurrentSize = 0;
    this.stackUpperElement = null;
  }

  push(elementToAdd) {
    const stackOverflow = this.stackCurrentSize >= this.stackMaxSize;
    const newElement = {
      value: elementToAdd,
      lowerElement: null
    };

    if (stackOverflow) {
      throw new Error('Stack overflow');
    } else if (!this.stackUpperElement) {
      this.stackUpperElement = newElement;
      this.stackCurrentSize++;
    } else {
      newElement.lowerElement = this.stackUpperElement;
      this.stackUpperElement = newElement;
      this.stackCurrentSize++;
    }
  }

  pop() {
    const elementToPop = this.stackUpperElement;

    if (this.stackCurrentSize === 0) {
      throw new Error('Empty stack');
    }

    this.stackUpperElement = this.stackUpperElement.lowerElement;
    this.stackCurrentSize--;

    return elementToPop.value;
  }

  peek() {
    return this.isEmpty() ? null : this.stackUpperElement.value;
  }

  isEmpty() {
    return this.stackCurrentSize === 0;
  }

  toArray() {
    const arrayOfStackElements = [];
    let currentElement = this.stackUpperElement;

    while (currentElement) {
      arrayOfStackElements.push(currentElement.value);
      currentElement = currentElement.lowerElement;
    }

    return arrayOfStackElements.reverse();
  }

  static fromIterable(iterableInput) {
    const isIterable = typeof iterableInput[Symbol.iterator] === 'function';

    if (!isIterable) {
      throw new Error('Not iterable');
    }

    const newStackElements = Array.from(iterableInput);
    const newStackMaxSize = newStackElements.length;
    const newStackFromIterable = new Stack(newStackMaxSize);

    newStackElements.forEach((element) => newStackFromIterable.push(element));

    return newStackFromIterable;
  }
}


// Assignment 2:
class LinkedList {
  constructor() {
    this.listFirstElement = null;
    this.listLastElement = null;
  }

  append(elementToAdd) {
    const newElement = {
      value: elementToAdd,
      nextElement: null
    };

    if (this.listFirstElement === null) {
      this.listFirstElement = newElement;
      this.listLastElement = newElement;
    } else {
      this.listLastElement.nextElement = newElement;
      this.listLastElement = newElement;
    }
  }

  prepend(elementToAdd) {
    const newElement = {
      value: elementToAdd,
      nextElement: null
    };

    if (this.listFirstElement === null) {
      this.listFirstElement = newElement;
      this.listLastElement = newElement;
    } else {
      newElement.nextElement = this.listFirstElement;
      this.listFirstElement = newElement;
    }
  }

  find(elementToFind) {
    let currentElement = this.listFirstElement;

    while (currentElement) {
      if (currentElement.value === elementToFind) {
        return currentElement.value;
      }

      currentElement = currentElement.nextElement;
    }

    return null;
  }

  toArray() {
    const arrayOfListElements = [];
    let currentElement = this.listFirstElement;

    while (currentElement) {
      arrayOfListElements.push(currentElement.value);
      currentElement = currentElement.nextElement;
    }

    return arrayOfListElements;
  }

  static fromIterable(iterableInput) {
    const isIterable = typeof iterableInput[Symbol.iterator] === 'function';
    
    if (!isIterable) {
      throw new Error('Not iterable');
    }

    const newListElements = Array.from(iterableInput);
    const newListFromIterable = new LinkedList();
    
    newListElements.forEach((element) => newListFromIterable.append(element));

    return newListFromIterable;
  }
}