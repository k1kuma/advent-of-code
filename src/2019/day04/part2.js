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
    let adjacentFound = false;
    let incrementingDigits = true;
    let digitCountArr = [];
    let digitCount = 1;

    // We also need to reset everything once we reach each digit...
    const end =  String(i).length - 1;
    for (let digit = 1; digit < String(i).length; digit++) {

      // Check for adjacent digit is equivalent or digits incrementing.
      const value = String(i).charAt(digit);

      // If this is the first adjacent Found, just set it to true and continue.
      if (previous == value) {
        adjacentFound = true;
        digitCount++;
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
      else if (previous != value) {
        // We can now push the digitCount to the digitCountArr.
        digitCountArr.push(digitCount);
        digitCount = 1;
      }

      previous = value;

      if (digit == end) {
        digitCountArr.push(digitCount);
      }
    }

    // See either of these conditions failed, then it is an invalid password. For Part Two, another check
    // is required to see if adjacent digits are not part of a larger group of digits.
    if (!adjacentFound || !incrementingDigits || !digitCountArr.includes(2)) {
      continue;
    }

    console.log('Eligible Password: ' + i);
    sum++;

  }
  return sum;
}

const lower = 236491;
const upper = 713787;
console.log(findNumPasswords(lower,upper));