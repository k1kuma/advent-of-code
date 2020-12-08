const lineReader = require('line-reader');

// lineReader.eachLine('sample.txt', function(line,last) {
lineReader.eachLine('input.txt', function(line,last) {
  console.log(line);

  if (last) {
    return false; // stop reading
  }
});
