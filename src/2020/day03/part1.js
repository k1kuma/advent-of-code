let x = 0;
let y = 0;

const lineReader = require('line-reader');
// lineReader.eachLine('sample.txt', function(line,last) {
lineReader.eachLine('input.txt', function(line,last) {
  console.log(line +  ' + ' + line);
  console.log(x % 32);
  x = x + 3;
  y++
  if (last) {
    return false; // stop reading
  }
});
