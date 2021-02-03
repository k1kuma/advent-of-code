// --- Day 9: Encoding Error Part 2 ---
// https://adventofcode.com/2020/day/9
// Part2.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

const fs = require("fs");
const text = fs.readFileSync("./input.txt", "utf-8");
const preamble = 25;

function findContiguousSet(text, invalidNumber) {
  const input = text.split('\n');
  const sumReducer = (acc, curr) => Number(acc) + Number(curr);
  let fullList = [];
  // Create numeric list from text input.
  for (let e = 0; e < input.length; e++) {
    fullList.push(Number(input[e]));
  }
  // Go through each item in the list and compare with subsequent elements
  // to see if we can generate a sum of contiguous integers that will be equal to the
  // invalidNumber.
  for (let f = 0; f < fullList.length; f++) {
    let sumArray = [];
    const start = fullList[f];
    if (start > invalidNumber) {
      continue;
    }
    // First item in the list.
    sumArray.push(Number(start));
    for (let g = f+1; g < fullList.length; g++) {
      const next = fullList[g];
      if (next > invalidNumber) {
        continue;
      }
      // Get current array sum and compare with addition to next.
      const arraySum = sumArray.reduce(sumReducer);
      const total = arraySum + next;
      // Exit if the arraySum + next find the invalid number
      // by returning addition of first element of sumArray + next.
      if (total <= invalidNumber) {
        // invalidNumber havent reached yet, add next to sumArray.
        sumArray.push(Number(next));
        if (total == invalidNumber) {
          console.log(sumArray + ' = ' + total);
          sumArray.sort(function(a, b) {
            return a - b;
          });
          const lowHigh = Number(sumArray[0] +sumArray[sumArray.length - 1]);
          return 'Sum of lowest and highest numbers in contiguous set: ' + lowHigh;
        }
        continue;
      } else {
        // Move onto next increment in the list (ineligible contiguous)
        break;
      }
    }
  }
  return -1;
}

function findInvalidNumber(text){
  // Setup steps of console instructions to array.
  const prem = preamble;
  const input = text.split('\n');
  const list = [];
  for (let h = 0; h < input.length; h++) {
    const number = input[h];
    // Start validating number in list once list is preamble size.
    if (list.length >= prem) {
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
      // Also for part2, find contiguous set of numbers that their
      // sum is equivalent to the negative number.
      if (!sumFound) {
        console.log(findContiguousSet(text , Number(number)));
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
console.log('Invalid Number In List: ' + findInvalidNumber(text));
