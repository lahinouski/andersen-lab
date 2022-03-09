// Assignment 1:
const promptCount = prompt('Number:');
const promptRadix = prompt('Radix:', 8);

function numberConverter(count, radix) {
  const invalidInput = isNaN(count) || isNaN(radix) || radix < 2 || radix > 32;

  console.log(invalidInput ? 'Wrong input!' : Number(count).toString(radix));
}

numberConverter(promptCount, promptRadix);


// Assignment 2:
const promptCountFirst = Number(prompt('First number:'));
const promptCountSecond = Number(prompt('Second number:'));

function calculator(count1, count2) {
  if (isNaN(count1)) {
    console.log('Wrong input!');
  } else if (isNaN(count2)) {
    console.log('Wrong input!');
  } else {
    const adder = count1 + count2;
    const divisor = count1 / count2;

    console.log(`Calculated values: ${adder}, ${isNaN(divisor) ? 0 : divisor}.`);
  }
}

calculator(promptCountFirst, promptCountSecond);