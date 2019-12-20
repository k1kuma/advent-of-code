let input = [];
let firstWireRead = false;
let wireA = [];
let wireB = [];
let closest = 0;

// Given the wire and its path, add the coordinates of where 
// the wire lies. 
// If this is wireB, check to see if it crossed paths with wireA.
function traverseWire(path, wire){ 
  let coord = { x: 0, y: 0 };
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

      const twin = Object.assign({}, coord);
      wire.push(twin);
      // Before moving to the next instruction, see if this current coordinate
      // intersects with the first wire.
      if (!firstWireRead) {
        wireTravelA++;
      }
      else {
        // Find if the array contains an object by comparing the coordinate values.
        wireTravelB++;
        const intersects = wireA.some(element => element.x == twin.x && element.y == twin.y);
        if (intersects) {
          const pointDistance = Math.abs(twin.x)  + Math.abs(twin.y);
          // First point found, set the distance of the closest point.
          if (closest == 0 ) {
            closest = pointDistance;
          }
          else if (pointDistance < closest) {
            // New closest interection found.
            closest = pointDistance;
            console.log(twin);
            console.log(pointDistance);
            console.log('<MK> WIRE DISTANCE TRAVELLED: ');
            console.log(wireTravelA);
            console.log(wireTravelB);
            console.log('<MK> =========================');
          }
        }
      }
    }
  }
  // Reset the coordinates
  coord = { x: 0, y: 0 };
}

function getWirePath(line) {
  input = line.split(',');
  let memory = input.slice();
  if (!firstWireRead) {
    traverseWire(memory, wireA);
    firstWireRead = true;
  }
  else {
    traverseWire(memory, wireB);
  }
}

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  getWirePath(line);
  if (last) {
    return false; // stop reading
  }
});
