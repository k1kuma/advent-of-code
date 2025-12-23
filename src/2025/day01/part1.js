// --- Day 01: Secret Entrance ---
// https://adventofcode.com/2025/day/01
// part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

function joltMultiplier(text){
  let zeroCounter = 0;

  console.log(text);
  const input = text.split('\n');
  console.log(input);
  // Count number of adapters separated by 1 or 3 joltages.
  // for (let h = 0; h < input.length; h++) {
  //   let joltDiff;
  //   if (h == 0) {
  //     joltDiff = input[h] - 0;
  //   } else {
  //     joltDiff = input[h] - input[h - 1];
  //   }
  //   if (joltDiff == 3) { 
  //     threeJoltAdpt++;
  //   } else if (joltDiff == 1) { 
  //     oneJoltAdpt++;
  //   }
  // }
  // // Increment for devices' built-in joltage adapter.
  // threeJoltAdpt++;

  return zeroCounter;
}

// Find and print out the number of adapters separated by 1 jolt 
// multiplied by adapters separeted by 3 jolts.
console.log('Number of 1-jolt diffs * Number of 3-jolf diffs '
              + joltMultiplier(text));
