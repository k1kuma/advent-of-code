// --- Day 10: Adapter Array Part 1 ---
// https://adventofcode.com/2020/day/10
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./sample.txt", "utf-8");

function joltMultiplier(text){
  let oneJoltAdpt = 0;
  let threeJoltAdpt = 0;

  // Setup sorted list of adapters joltages.
  const input = text.split('\n').sort(function(a, b) {
    return a - b;
  });

  for (let h = 0; h < input.length; h++) {
    let joltDiff;
    if (h == 0) {
      joltDiff = input[h] - 0;
    } else {
      joltDiff = input[h] - input[h - 1];
    }
    if (joltDiff == 3) { 
      threeJoltAdpt++;
    } else if (joltDiff == 1) { 
      oneJoltAdpt++;
    }
  }
  // Increment for devices' built-in joltage adapter.
  threeJoltAdpt++;

  console.log(input);
  console.log(oneJoltAdpt);
  console.log(threeJoltAdpt);

  return oneJoltAdpt * threeJoltAdpt;
}

// Find and print out the number of adapters separated by 1 jolt 
// multiplied by adapters separeted by 3 jolts.
console.log('Number of 1-jolt diffs * Number of 3-jolf diffs '
              + joltMultiplier(text));

// In this smaller example (see adventOfCode.com), when using every adapter,
// there are 7 differences of 1 jolt and 5 differences of 3 jolts.

// In this larger example (sample.txt), in a chain that uses all of the adapters,
// there are 22 differences of 1 jolt and 10 differences of 3 jolts.


