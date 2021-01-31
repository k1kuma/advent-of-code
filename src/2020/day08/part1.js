// --- Day 8: Report Repair Part 1 ---
// https://adventofcode.com/2020/day/8
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

function addToSequence(text) {
  let seqArr = [];
  text.split('\n').forEach(inst => {
    seqArr.push(inst);
  });
  return seqArr;
}

function retrieveInstructionSteps(seq) {
  return seq.split(' ');
}

function fixLoop(){
  // Setup steps of console instructions to array.
  let seqObj = {};
  let seqArr = addToSequence(text);
  let accumulator = 0;

  for (let i = 0; i < seqArr.length;) {
    // Retrive instructions and steps to jump
    const element = seqArr[i];
    const fullSeq = retrieveInstructionSteps(element);
    const inst = fullSeq[0];
    let steps = fullSeq[1];

    // Repeat instruction, the infinite loop has started, exit.
    if (seqObj[i]) {
      break;
    }

    seqObj[i] = element;

    // Increment steps or add to accumulator score.
    if (inst === 'acc') {
      accumulator += Number(steps.substring(steps.indexOf('+')));
      i++;
    } else if (inst === 'nop') {
      i++;
    } else {
      i += Number(steps[0] == '+' ? steps.substring(1) : steps);
    }
  }

  return accumulator;
}

// Print out total accumulator score after code starts looping.
console.log('Accumulator Score: ' + fixLoop());