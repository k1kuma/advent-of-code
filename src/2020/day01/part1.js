const lineReader = require('line-reader');
const year = 2020;
let yearsMap = new Map();

lineReader.eachLine('input.txt', function(line,last) {

  const current = Number(line);
  const searchNum = year - current;

  console.log('<MK> current number is ' + current + ' looking for ' + searchNum);

  if (yearsMap[searchNum]) {
    console.log('Returning ' + searchNum * current);
    return false;
  } else {
    yearsMap[current] = current;
  }

  if (last) {
    console.log(yearsMap);
    return false; // stop reading
  }
});