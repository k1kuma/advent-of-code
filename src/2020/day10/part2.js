// --- Day 10: Adapter Array Part 1 ---
// https://adventofcode.com/2020/day/10
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./sample.txt", "utf-8");

function arrangementCount(text){
  let input = text.split('\n').map(str => parseInt(str));
  input.push(0);
  input.push(Math.max(...input) + 3);

  const maxPlusOne = Math.max(...input) + 1;

  // Setup sorted list of adapters joltages.
  input.sort(function(a, b) {
    return parseInt(a - b);
  });

  let paths = [];
  paths[0] = 1;

  console.log(input);
  for (let i = 1; i <= maxPlusOne; i++) {
    for (let x = 1; x <= 4; x++) {
      iMinusX = parseInt(i) - parseInt(x);
      if (input.includes(iMinusX)) {
        console.log('paths[' + i + '] = ' + paths[iMinusX] + ' ====> ' + iMinusX);
        // paths[i] += paths[i-x];
        paths[i] = iMinusX;
      }
    }
  }

  console.log(paths);
  return paths.reduce((a, b) => a * b, 0);

  //        Python Solution
  //   data = [16,10,15,5,1,11,7,19,6,12,4];
  //   data.append(0);
  //   data.append(max(data) + 3);
  //   data.sort();

  // maxPlusOne = max(data) + 1;

  // paths = [0] * maxPlusOne;
  // paths[0] = 1;

  // for index in range (1,maxPlusOne):
  //     for x in range (1,4):
  //         if (index - x) in data:
  //             paths[index] += paths[index-x]

  // print('hello');
  // print(paths);
  // print(str(paths[-1]));
}

// In this smaller example (see adventOfCode.com), when using every adapter,
// there are 7 differences of 1 jolt and 5 differences of 3 jolts.
// 11 arrangements

// In this larger example (sample.txt), in a chain that uses all of the adapters,
// there are 22 differences of 1 jolt and 10 differences of 3 jolts.
// 19208 arrangements

// Find and print out the number of arrangers the adapters can 
// be placed in to validly reach 0 to default highest adapter joltage.
console.log('Number of adapter arrangements: '
              + arrangementCount(text));
