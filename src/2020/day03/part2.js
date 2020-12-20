/* 
--- Part Two ---
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?

Your puzzle answer was 5140884672.
*/

let y = 1;
let r1d1 = 0;
let r1d2 = 0;
let r3d1 = 0;
let r5d1 = 0;
let r7d1 = 0;
let r1d1Count = 0;
let r3d1Count = 0;
let r5d1Count = 0;
let r7d1Count = 0;
let r1d2Count = 0;
const mod = 31;

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  console.log(line + ' line ' + y);
  const r1IndexChar = line.charAt(r1d1 % mod);
  const r3IndexChar  = line.charAt(r3d1 % mod);
  const r5IndexChar = line.charAt(r5d1 % mod);
  const r7IndexChar = line.charAt(r7d1 % mod);
  const r1d2IndexChar = line.charAt(r1d2 % mod);

  // increment treeCounts if the indexChar is a '#' sign
  if (r1IndexChar == '#') {
    r1d1Count++;
  }
  if (r3IndexChar == '#') {
    r3d1Count++;
  }
  if (r5IndexChar == '#') {
    r5d1Count++;
  }
  if (r7IndexChar == '#') {
    r7d1Count++;
  }
  if (Number.isInteger(r1d2) && r1d2IndexChar == '#') {
    r1d2Count++;
  }

  // increment x by 3 for next line
  r1d1 ++;
  r3d1 += 3;
  r5d1 += 5;
  r7d1 += 7;
  r1d2 += 0.5;
  y++;

  if (last) {
    // print out the number of trees found from the five routes and the product of counts
    console.log(r1d1Count + ', ' + r3d1Count + ', ' + r5d1Count + ', ' + r7d1Count + ', ' + r1d2Count);
    console.log('Product of all treeCounts: ' + r1d1Count * r1d2Count * r3d1Count * r5d1Count * r7d1Count);
    return false; // stop reading
  }
});
