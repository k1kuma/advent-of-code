let input = [];
let wireA = [];
let wireB = [];

function traverseWire(path){ 
  let direction = path.charAt(0);
  let distance = parseInt(path.substring(1));
  if (direction == 'L' || direction == 'R') {
    let strip = []
    for (let i = 0; i < distance; i++) {
      strip.push(1);
    }
    grid.push(strip);
    if (direction == 'L') {
      xCoord -= distance;
    }
    if (direction == 'R') {
      xCoord += distance;
    }
  }
  if (direction == 'U' || direction == 'D') {
    let strip = []
    for (let i = 0; i < distance; i++) {
      strip.push(1);
    }
    grid.push(strip);
    if (direction == 'L') {
      xCoord -= distance;
    }
    if (direction == 'R') {
      xCoord += distance;
    }
  }
}

function getWirePath(line) {
  input = line.split(',');
  let memory = input.slice();
  for (let i = 0; i < memory.length; i++) {
    let element = memory[i];
    traverseWire(element);
  }
}

const lineReader = require('line-reader');
// lineReader.eachLine('input_day3.txt', function(line,last) {
lineReader.eachLine('sample.txt', function(line,last) {
  getWirePath(line);
  if (last) {
    return false; // stop reading
  }
});