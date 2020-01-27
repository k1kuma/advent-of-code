let input = [];
let code = 19690720;

function computeOperations(memory, noun, verb) {
  memory[1] = noun;
  memory[2] = verb;
  memory = memory.map(Number);

  let i = 0;
  while (i < memory.length) {
    // Store the addresses in some variables mang...
    let opcode = memory[i];
    let input1 = memory[i+1];
    let input2 = memory[i+2];
    let output = memory[i+3];
    if (opcode == 1) {
      memory[output] = memory[input1] + memory[input2];
      i += 4;
    }
    else if (opcode == 2) {
      memory[output] = memory[input1] * memory[input2];
      i += 4;
    }
    else if (opcode == 99) {
      break;
    }
    else {
      console.log('INVALID OPCODE');
      i += 4;
    }
  }

  console.log(memory[0]);

  if (memory[0] == code) {
    console.log('FOUND IT');
    console.log('NOUN: ' + noun + ' | VERB: ' + verb);
    console.log(Math.floor(100 * parseInt(noun) + parseInt(verb)));
    return true;
  }

  // false if the noun & verb does not exist.
  return false;
}

function findNounAndVerb(line) {
  input = line.split(',').map(Number);
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let memory = input.slice();
      if (computeOperations(memory,i,j)) {
        return;
      }
    }
  }
}

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  findNounAndVerb(line);
  if (last) {
    return false; // stop reading
  }
});