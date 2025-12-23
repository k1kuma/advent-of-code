// --- Day 01: Secret Entrance ---
// https://adventofcode.com/2025/day/01
// part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var path = require("path");
var text = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

function secretEntrance(text){
  let zeroCounter = 0;
  let current = 50;
  const input = text.split('\n').filter(line => line.trim() !== '');

  for (let i = 0; i < input.length; i++) {
    let line = input[i].trim();
    let direction = line[0];
    let magnitude = parseInt(line.slice(1), 10);

    if (direction === 'L') {
      current = current - magnitude;
      if (current < 0) {
        current = (current % 100 + 100) % 100;
      }
    } else if (direction === 'R') {
      current = current + magnitude;
      if (current >= 100) {
        current = current % 100;
      }
    }

    if (current === 0) {
      zeroCounter++;
    }
  }

  return zeroCounter;
}

// Find and print out the number of times the dial points at 0
console.log(
  'The number of times the dial is left pointing at 0 after any rotation in the sequence:',
  secretEntrance(text)
);
