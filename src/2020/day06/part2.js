// --- Day 6: Custom Customs Part 2 ---
// https://adventofcode.com/2020/day/6
// Part2.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

let qMap = {};
let qSum = 0;

// qMap for part2 will continue with questions answered
// yes as keys and number of times they are answered as values
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

// countAns will now take the numPeople of each group 
// and check if the number of times a question has been 
// answered yes before incrementing the number of times a 
// question was answered yes for each group member.
function countAns(numPeople) {
  let numQs = 0;
  for (const [key, value] of Object.entries(qMap)) {
    if (value == numPeople) {
      numQs++;
    }
  }
  return numQs;
}

let groupNum = 1;
let numPersGroup = 0;

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {

  // Populate next set of questions answered Y for group
  if (line !== '') {
    populateGroupQs(line);
    numPersGroup++;
  }

  // Count number of questions answered yes and reset for new group
  if (line === '' || last) {
    console.log('Group #: ' + groupNum + ' (number of persons: ' + numPersGroup + ').');
    console.log('\n' + JSON.stringify(qMap));
    qSum += countAns(numPersGroup);
    qMap = {};
    numPersGroup = 0;
    groupNum++;
  }

  if (last) {
    console.log('\n' + 'Number of Questions YES (aggregate): ' + qSum + '\n');
    return false; // stop reading
  }
});
