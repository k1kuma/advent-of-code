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
  let firstCheck = Number(reqs.split('-')[0]) - 1;
  let secondCheck = Number(reqs.split('-')[1]) - 1;

  // Next two conditions indicate both or none of the indexes
  // contain the character of interest. This is not a valid password
  if (pwd[firstCheck] === koi && pwd[secondCheck] === koi) {
    return; 
  }

  if (pwd[firstCheck] !== koi && pwd[secondCheck] !== koi) {
    return;
  }

  console.log('valid: ' + lineArr);
  numValid++;

  return;
}

lineReader.eachLine('input.txt', function(line,last) {
  const lineArr = line.split(' ');
  if (lineArr.length == 3) {
    verifyPassword(lineArr);
  }

  // stop reading on last line
  if (last) {
    console.log(numValid);
    return false;
  }
});
