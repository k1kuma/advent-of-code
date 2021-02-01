// --- Day 8: Handheld Halting Part 2 ---
// https://adventofcode.com/2020/day/8
// Part2.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

function getSequence(text) {
  let seqArr = [];
  text.split('\n').forEach(seq => {
    seqArr.push(seq);
  });
  return seqArr;
}

function getjmpNopIndexes(seq) {
  let switchLineArr = [];
  for (let g = 0; g < seq.length; g++) {
    const inst = getInstructionSteps(seq[g])[0];
    if (inst === 'jmp' || inst === 'nop') {
      switchLineArr.push(g);
    }
  }
  return switchLineArr;
}

// Return separated instruction and steps via two-element array.
function getInstructionSteps(seq) {
    return seq.split(' ');
}

// Re-Generate seqArr from fixLoop() function but with/
// one properly swapped 
function getRevisedSeqs(arr, swapIndex) {
  let revisedSeqArr = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (i != swapIndex) {
      revisedSeqArr.push(element);
      continue;
    }
    const fullSeq = getInstructionSteps(element);
    let inst = fullSeq[0];
    const steps = fullSeq[1];
    if (inst == 'jmp') {
      inst = 'nop';
    } else if (inst == 'nop') {
      inst = 'jmp';
    }
    revisedSeqArr.push(inst + ' ' + steps);
  }
  return revisedSeqArr;
}

function fixLoop(){
  // Setup steps of console instructions to array.
  let seqArr = getSequence(text);
  let jmpNopIndexes = getjmpNopIndexes(seqArr);

  for (let h = 0; h < jmpNopIndexes.length; h++) {
    let successfulTerminate = true;
    let accumulator = 0;
    let seqObj = {};
    const swapIndex = jmpNopIndexes[h];

    // Rebuild instruction sequence array so we can include swapped element.
    let revisedSeqArr = getRevisedSeqs(seqArr, swapIndex);
    for (let i = 0; i < revisedSeqArr.length;) {
      // Retrieve instructions and steps to jump
      const element = revisedSeqArr[i];
      const fullSeq = getInstructionSteps(element);
      let inst = fullSeq[0];
      const steps = fullSeq[1];

      // Repeat instruction, the infinite loop has started, exit.
      if (seqObj[i]) {
        successfulTerminate = false;
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

    if (successfulTerminate) {
      return accumulator;
    }
  }
  return -1;
}

// Print out total accumulator score after code starts looping.
console.log('Accumulator Score: ' + fixLoop());
