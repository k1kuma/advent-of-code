// Given a set of intersecting coordinates, calculate the amount of distance both
// wires A and B need to trave through before getting to that specific point of intersection.
function calculateDistance(point, wireBTravel) {
  let wireATravel = 0;
  for (let i = 0; i < wireA.length; i++) {
    if (wireA[i].x != point.x || wireA[i].y != point.y) {
      continue;
    }
    // If we get here, then the points are a match, figure out the distance...
    wireATravel = Math.floor(i + 1);
  }
  const totalDistance = Math.floor(wireATravel + wireBTravel);
  console.log(JSON.stringify(point) + ' -- Wire A: ' + wireATravel + ' -- Wire B: ' + wireBTravel + ' - Wire Total Distance: ' + totalDistance);
  return totalDistance;
}

// Given the wire and its path, add the coordinates of where 
// the wire lies. 
// If this is wireB, check to see if it crossed paths with wireA.
function traverseWire(path, firstWire) {
  let coord = { x: 0, y: 0 };
  let output = []
  let wireDistance = 0;

  for (let i = 0; i < path.length; i++) {
    let element = path[i];
    let direction = element.charAt(0);
    let distance = parseInt(element.substring(1));
    for (let j = 0; j < distance; j++) {
      if (direction == 'L')  {
        coord.x--;
      }
      else if (direction == 'R') {
        coord.x++;
      }
      else if (direction == 'U') {
        coord.y++;
      }
      else if (direction == 'D') {
        coord.y--;
      }
      else {
        console.log('INELIGIBLE DIRECTION...SKIPPING');
        continue;
      }

      const coordClone = Object.assign({}, coord);
      output.push(coordClone);

      if (firstWire) {
        continue;
      }

      // Down here means we're traversing wireB. Let's see wire A as the point of reference.
      // Find if the array contains an object by comparing the coordinate values.
      const intersects = wireA.some(element => element.x == coordClone.x && element.y == coordClone.y);
      if (intersects) {
        // The distance wire B travelled 
        const aggregateDistance = calculateDistance(coordClone, output.length);
        if (wireDistance == 0 || aggregateDistance < wireDistance) {
          wireDistance = aggregateDistance;
          continue;
        }
      }
    }
  }

  if (!firstWire) {
    console.log('SHORTEST AGGREGATE WIRE DISTANCE: ' + wireDistance);
  }

  return output;
}

function getWirePath(line) {
  input = line.split(',');
  let memory = input.slice();
  if (firstWire) { 
    wireA = traverseWire(memory, firstWire);
    firstWire = false;
  }
  else {
    traverseWire(memory, firstWire);
  }
}

let input = [];
let firstWire = true;
let wireA = [];

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  getWirePath(line);
  if (last) {
    return false; // stop reading
  }
});
