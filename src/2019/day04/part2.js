// Go through the lower and upper limits of the 
// input and find which inputs are eligible as passwords.
function findNumPasswords(lower, upper) {
  let sum = 0;

  // Convert the number to string?
  // Given current lower/upper, may not have to.
  for (let i = lower; i <= upper; i++) {
    const numLength = String(i).length;

    if (numLength > 6 || numLength != String(lower).length || numLength != String(upper).length) {
      console.log('Input  is outside of range, trying next number.');
      return;
    }

    let previous = String(i).charAt(0);
    let adjacentDigitsEq = false;
    let incrementingDigits = true;
    let prevGroup = [];

    // We also need to reset everything once we reach each digit...
    for (let digit = 1; digit < String(i).length; digit++) {
      // Check for adjacent digit is equivalent or digits incrementing.
      const value = String(i).charAt(digit);
      // If this is the first adjacent Found, just set it to true and continue.
      if (previous == value) {
        prevGroup.push(previous);
        adjacentDigitsEq = true;
        // Last digit of the number should be pushed in too if equal to the
        // previous digit.
        if (digit == String(i).length - 1) {
          prevGroup.push(value);
        }
      }
      else if (previous > value) {
        // The digits are not incrementing from left to right, this number is no
        // longer eligible. Add a multiplier value depending on the decrementing digit to
        // further optimize between the input ranges.
        incrementingDigits = false;
        let multiplier = 10000;
        for (let i = 1; i < digit; i++ ) {
          multiplier = multiplier / 10;
        }
        if (multiplier > 100) {
          i += multiplier;
        }
        break;
      }
      else if (previous != value && adjacentDigitsEq) {
        // This ensures the last matching adjacent digit is included
        // inside of the prevGroup array.
        prevGroup.push(previous);
      }
      previous = value;
    }
    // See if these conditions passed, then it is a valid password.
    if (incrementingDigits) {
      // For Part Two, there is now an array here (prevGroup) that can be used to
      // determine whether the adjacent digits are a part of a larger group.
      console.log('Adjacent Matching Digits: ' + JSON.stringify(prevGroup));
      console.log('Eligible Password: ' + i);
      sum++;
    }
  }
  return sum;
}

const lower = 236491;
const upper = 713787;
console.log(findNumPasswords(lower,upper));
