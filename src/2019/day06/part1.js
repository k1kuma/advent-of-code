const lineReader = require('line-reader');
let orbitObj = {};

function parseOrbit(line) {

}

// Read the input.txt file and create array from contents.
lineReader.eachLine('input.txt', function(line,last) {
  let orbitCount = 0;
  orbitCount += parseOrbit(line);
  if (last) {
    console.log(orbitCount);
    return false; // stop reading
  }
});