// --- Day 2: Password Philosophy Part 1 ---
// https://adventofcode.com/2020/day/2
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

const lineReader = require('line-reader');
let numValid = 0;

function verifyPassword(lineArr) {
  const reqs = lineArr[0];            // minimum and maximum requirements
  const koi = lineArr[1][0];          // fetch the first index of lineArr[1] to omit the ';'
  const pwd = lineArr[2];             // actual password

  if (reqs === '' || koi == '' || pwd == '') {
    console.log('Invalid parameter in entry');
    return;
  }

  // Fetch the minimum and maximum character requirements
  const min = Number(reqs.split('-')[0]);
  const max = Number(reqs.split('-')[1]);

  // Check for conditions
  // No minimum requirement means password will be always valid
  if (reqs[0] == '0') {
    console.log('No minimum character requirement, password is valid.');
    numValid++;
    return;
  }

  // Minimum requirement if greater than pwd lenght, entry cannot valid
  if (Number(reqs[0]) > pwd.length) {
    console.log('Minimum requirement greater than password length. Not valid entry.');
    return;
  }

  // Reaching here means we can parse the password and validate
  let count = 0;
  for (let i = 0; i < pwd.length; i++) {
    if (pwd[i] == koi)  {
      count++;
    }

    if (count > max) {
      return;
    }
  }

  if (count < min) {
    return;
  }

  console.log('valid: ' + min + ' - ' + max + ' ' + koi + ' - ' + pwd);
  numValid++;
  return;
}

lineReader.eachLine('input.txt', function(line,last) {
  const lineArr = line.split(' ');
  if (lineArr.length == 3) {
    verifyPassword(lineArr);
  }

  // stop reading on the last line read
  if (last) {
    console.log(numValid);
    return false;
  }
});