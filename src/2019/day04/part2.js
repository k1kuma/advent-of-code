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

    let previous = -1;
    let adjacentFound = false;
    let incrementingDigits = true;
    let prevGroup = [];

    // We also need to reset everything once we reach each digit...
    for (let digit = 0; digit < String(i).length; digit++) {
      // Check for adjacent digit is equivalent or digits incrementing.
      const value = String(i).charAt(digit);
      // If this is the first adjacent Found, just set it to true and continue.
      if (previous == value) {
        prevGroup.push(value);
        // Since this could be the first adjacent, push down the previous array
        // as well...
        if (!adjacentFound) {
          prevGroup.push(previous);
          adjacentFound  = true;
        }
      }
      else if (previous > value) {
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
      previous = value;
    }
    // See if these conditions passed, then it is a valid password.
    if (incrementingDigits) {
      console.log('<MK>: ' + prevGroup);
      console.log('Eligible Password: ' + i);
      sum++;
    }
  }
  return sum;
}

const lower = 236491;
const upper = 713787;
console.log(findNumPasswords(lower,upper));
