// --- Day 5: Binary Boarding Part 2 ---
// https://adventofcode.com/2020/day/5
// Part2.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

let airplaneRows = 127;
let airplaneCols = 7;

// Taking in the number of rows/columns on a plane, 
// determine the row/column based on the sequence of characters
// passed in via seq
function calcRowOrCol(nums, seq) {
  let calc = nums;
  let lower = 0;
  let higher = nums;

  for (let i = 0; i <= seq.length; i++) {  // Loop through, reducing higher, increased lower
    const diff = higher - lower;           // until narrowed down to a single number. 
    const element = seq.charAt(i);

    if (element == 'B' || element == 'R') {
      // upper halve
      const diff2F = Math.floor(diff/2);
      lower += diff2F;
    }
    else if (element == 'F' || element == 'L') {
      // lower halve
      const diff2C = Math.ceil(diff/2);
      higher -= diff2C;
    }

    if (diff == 1) {
      return element == 'B' || element == "R" ? lower : higher;
    }
  }

  return calc;
}

// After all seat IDs have been generated, go through each seatID (key)
// via seatMap and check if the column value of these seats to 
// see if this is your seat.
function findYourSeat(maxRow) {
  const minRow = 2 * (airplaneCols + 1);
  for (let i = minRow; i <= maxRow; i++) {
    if (!seatMap[i]) {
      const before = i - 1;
      const after = i + 1;
      // Standard column skip, not a missed seat.
      if (seatMap[before].column != 0 && seatMap[after].column != 2) {
        return i;
      }
    }
  }

  console.log('Missing seat was not found, returning -1.');
  return -1;
}

let highestID = 0;
let seatMap = new Map();

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {

  // Calculate row/column to generate seat ID
  const rowSeq = line.substring(0,line.length - 3);
  const row = calcRowOrCol(airplaneRows, rowSeq);
  const colSeq = line.substring(line.length - 3);
  const col = calcRowOrCol(airplaneCols, colSeq)
  const seatID = (row * 8) + col;

  console.log(line + ' >> Calculated Seat ID: ' + seatID);

  // Replace highestID if newly calculated seatID is greater
  if (seatID > highestID) {
    highestID = seatID;
  }

  seatMap[seatID] = {row: row, column: col};

  // BONUS: In the future, maybe write a quick function that returns the row
  // and column based on retrieved seat ID.
  if (last) {
    console.log('\n  Your Seat: ' + findYourSeat(highestID) + '\n');
    return false; // stop reading
  }
});
