// --- Day 6: Custom Customs Part 1 ---
// https://adventofcode.com/2020/day/6
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

let qMap = {};
let qSum = 0;

function populateGroupQs(answers) {
  for (let i = 0; i < answers.length; i++) {
    const ele = answers.charAt(i);
    if (!qMap[ele]) {
      qMap[ele] = 1;
    } else if (qMap[ele]) {
      qMap[ele]++;
    }
  }
}

function countAns() {
  return Object.keys(qMap).length;
}

let groupNum = 1;

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {

  // Populate next set of questions answered Y for group
  if (line !== '') {
    populateGroupQs(line);  
  }
  
  // Count number of questions answered yes and reset for new group
  if (line === '' || last) {
    console.log('Group #: ' + groupNum + '\n' + JSON.stringify(qMap));
    qSum += countAns();
    qMap = {};
    groupNum++;
  }

  if (last) {
    console.log(qSum);
    return false; // stop reading
  }
});
