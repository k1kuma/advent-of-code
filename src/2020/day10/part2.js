// --- Day 10: Adapter Array Part 1 ---
// https://adventofcode.com/2020/day/10
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

// Count the number of arrangements the adapters can be 
// sorted in to reach from 0 to highest adapter's joltage.
function arrangementCount(text){
  let input = text.split('\n').map(str => parseInt(str));
  const highest = Math.max(...input);
  input.push(0);
  input.push(highest + 3);

  // Setup sorted list of adapters joltages.
  input.sort(function(a, b) {
    return parseInt(a - b);
  });

  const cache = {};
  // Start counting number of arrangements by going through each adapter
  // and recursively going through each item and seeing if its addition
  // of 1/3 joltages reach another adapter.
  function findCombos(currentEnd, availableAdapters) {
    if (currentEnd == highest) {
      return 1;
    }
    let combinationCount = 0;
    for (let i=1; i<=3; i++) {
      if (availableAdapters.includes(currentEnd + i)) {
        const remaining = availableAdapters.filter((value) => (value > (currentEnd + i)));
        if (cache[currentEnd + i] == null) {
          cache[currentEnd + i] = findCombos(currentEnd + i, remaining);
        }
        combinationCount += cache[currentEnd + i];
      }
    }
    return combinationCount;
  }
  console.log(input);
  return findCombos(0, input);
}

// Find and print out the number of arrangers the adapters can 
// be placed in to validly reach 0 to default highest adapter joltage.
console.log('Number of adapter arrangements: '
              + arrangementCount(text));
