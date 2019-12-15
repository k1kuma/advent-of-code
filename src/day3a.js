let input = [];
let coord = {
    x: 0,
    y: 0
};
let wireA = [];
let wireB = [];

function traverseWire(path){ 
  let direction = path.charAt(0);
  let distance = parseInt(path.substring(1));
  if (direction == 'L')  {
    coord.x -= distance;
  }
  else if (direction == 'R') {
    coord.x += distance;
  }
  else if (direction == 'U') {
    coord.y += distance;
  }
  else if (direction == 'D') {
    coord.y -= distance;
  }
}

function getWirePath(line) {
  input = line.split(',');
  let memory = input.slice();
  for (let i = 0; i < memory.length; i++) {
    let element = memory[i];
    traverseWire(element);
  }
  console.log(coord);
}

const lineReader = require('line-reader');
// lineReader.eachLine('input_day3.txt', function(line,last) {
lineReader.eachLine('sample.txt', function(line,last) {
  getWirePath(line);
  if (last) {
    return false; // stop reading
  }
});