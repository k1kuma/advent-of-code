// --- Day 3: Toboggan Trajectory Part 1 ---
// https://adventofcode.com/2020/day/3
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

let x = 0;
let y = 0;
let treeCount = 0;

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  let modulo = x % 31;
  let indexChar = line.charAt(modulo);

  // To build visual parsing for console.log
  let lineStr = '';
  if (modulo == 30) {
    lineStr = line.substring(0, modulo) + '(' + indexChar + ')';
  } else {
    lineStr = line.substring(0, modulo) + '(' + indexChar + ')'
      + line.substring(modulo + 1, line.length);
  }
  lineStr += ' - searching index ' + modulo + ' === line ' + y;
  console.log(lineStr);

  // Increment treeCount if the indexChar is a '#' sign
  if (indexChar === '#') {
    treeCount++;
  }

  // Increment x by 3 for next line
  x += 3;
  y++;

  if (last) {
    console.log(treeCount);
    return false; // stop reading
  }
});
