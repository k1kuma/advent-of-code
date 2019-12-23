// Given the wire and its path, add the coordinates of where 
// the wire lies. 
// If this is wireB, check to see if it crossed paths with wireA.
function traverseWire(path, firstWire) {
  let coord = { x: 0, y: 0 };  
  let output = [];
  let closest = 0;

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

      // Push coordinates to array if wire A.
      // Search for intersecting points if wire B.
      if (firstWire) {
        output.push(coordClone);
        continue;
      }

      // Before moving to the next instruction, see if this current coordinate
      // intersects with the first wire.
      // Find if the array contains an object by comparing the coordinate values.
      const intersects = wireA.some(element => element.x == coordClone.x && element.y == coordClone.y);
      if (intersects) {
        const pointDistance = Math.abs(coordClone.x)  + Math.abs(coordClone.y);
        // New closest interection found (or the first point).
        if (closest == 0 || pointDistance < closest) {
          closest = pointDistance;
          console.log(coordClone);
          console.log('Point Distance to origin: ' + pointDistance);
        }
      }
    }
  }

  if (!firstWire) {
    console.log('Distance of closest point to origin: ' + closest);
  }

  return output;
}

function getWirePath(line) {
  let input = line.split(',').slice();
  if (firstWire) { 
    wireA = traverseWire(input, firstWire);
    firstWire = false;
  }
  else {
    traverseWire(input, firstWire);
  }
}

let firstWire = true;
let wireA = [];

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  getWirePath(line);
  if (last) {
    return false; // stop reading
  }
});
