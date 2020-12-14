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
Answer: 
*/

let x = 0;
let y = 1;
let r1d1Count = 0;
let r3d1Count = 0;
let r5d1Count = 0;
let r7d1Count = 0;
let r1d2Count = 0;
let treeProd = 0;

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  if (y > 1) {
    const r1IndexChar = line.charAt(x % 31);
    const r3IndexChar  = line.charAt((x) % 31);
    const r5IndexChar = line.charAt((x+4) % 31);
    const r7IndexChar = line.charAt((x+6) % 31);
  
    console.log('<MK> ' + r1IndexChar + ' ' + r3IndexChar + ' ' + r5IndexChar + ' ' + r7IndexChar);
  
    if (y % 2 === 1) {
      if (r1IndexChar === '#') {
        r1d2Count++;
      }
    }
  
    // Increment treeCounts if the indexChar is a '#' sign
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
  }

  // Increment x by 3 for next line
  x+3;
  y++;

  if (last) {
    // Calculate the product where the number of trees were found in the following routes:
    // Right 1, down 1.
    // Right 3, down 1. (This is the slope you already checked.)
    // Right 5, down 1.
    // Right 7, down 1.
    // Right 1, down 2.
    console.log(r1d1Count);
    console.log(r1d2Count);
    console.log(r3d1Count);
    console.log(r5d1Count);
    console.log(r7d1Count);
    console.log('Product of all treeCounts: ' + r1d1Count * r1d2Count * r3d1Count * r5d1Count * r7d1Count);
    return false; // stop reading
  }
});
