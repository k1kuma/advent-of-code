// --- Day 9: Encoding Error Part 1 ---
// https://adventofcode.com/2020/day/9
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

function findInvalidNumber(text, prea){
  // Setup steps of console instructions to array.
  const preamble = prea;
  const input = text.split('\n');
  const list = [];

  for (let h = 0; h < input.length; h++) {
    const number = input[h];
    // Start validating number in list once list is preamble size.
    if (list.length >= preamble) {
      let sumFound = false;
      search:
      for (let i = 0; i < list.length - 1; i++) {
        const a = Number(list[i]);
        for (let j = i + 1; j < list.length; j++) {
          const b = Number(list[j]);
          const sum = a + b;
          if (sum == number) {
            // Remove the first element to make room for new element.
            list.shift();
            sumFound = true;
            break search;
          }
        }
      }

      // Since no sum was found, return this item in the list.
      if (!sumFound) {
        return number;
      }
    }

    // Still need to generate list based on number of elements 
    list.push(number);
  }

  return -1;
}

// Find and print out the invalid number using findInvalidNumber() 
// which can set the preabme size in the second parameter.
console.log('Invalid Number In List: ' + findInvalidNumber(text, 25));
