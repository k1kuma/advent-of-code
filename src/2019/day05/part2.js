const lineReader = require('line-reader');
const readlineSync = require('readline-sync');

// Determines whether to add or multiply parameters
// based on the opcode.
function translateSumProductOpcode(op, p1, p2) {
  if (op == '01' || op == '1') {
    return Math.floor(parseInt(p1) + parseInt(p2));
  }
  else if (op == '02' || op == '2') {
    return Math.floor(parseInt(p1) * parseInt(p2));
  }
  return;
}

// Determines whether to get input or output
// based on the opcode.
function translateInOutOpcode(op, p1,index) {
  if (op == '03' || op == '3') {
    return readlineSync.question('Opcode 03: Provide input? ');
  }
  else if (op == '04' || op == '4') {
    console.log('Opcode 04: '+ p1 + ' at index ' + index);
  }
  return;
}

// Function determining if we need to jump based
// on the parameters passed in. 
function translateJumpOpcode(op, p1) {

  let param1 = parseInt(p1)

  if ((op == '05' || op == '5') && (param1 != 0)) {
    // Return true on opcode 5 if the parameter is non-zero.
    return true;
  }
  else if ((op == '06' || op == '6') && param1 == 0) {
    // Return true on opcode 6 if the parameter is zero.
    return true;
  }
  else {
    return false;
  }
}

// Function comparing parameter values and returning boolean 
// based on the parameters passed in.
function translateParamCompareOpcode(op, p1, p2) {

  const param1 = parseInt(p1);
  const param2 = parseInt(p2);

  if ((op == '07' || op == '7') && param1 < param2) {
    // Return true on opcode 7 if the param1 is less than param2.
    return true;
  }
  else if ((op == '08' || op == '8') && param1 == param2) {
    // Return true on opcode 8 if the parameters are equivalent.
    return true;
  }
  else {
    return false;
  }
}

function reportError(opcode, index) {
  console.log('INVALID OPCODE, PROGRAM WILL FAIL:' + opcode + ' - Index ' + index);
  return;
}

function computeOperations(memory) {
  let i = 0;
  while (i < memory.length) {
    // Setup the potential paramters needed to process the opcodes.
    let opcode = '' + memory[i];

    if (opcode == '99') {
      break;
    }

    let p1;
    let p2;
    let output;

    // Position Mode Opcodes
    if (opcode == '1' || opcode == '2') {

      p1 = memory[memory[i+1]];
      p2 = memory[memory[i+2]];
      output = memory[i+3];

      memory[output] = translateSumProductOpcode(opcode, p1, p2);
      i += 4;
    }
    else if (opcode == '3') {
      output = memory[i+1];
      memory[output] = translateInOutOpcode(opcode, output, i);
      i += 2;
    }
    else if (opcode == '4') {
      output = memory[memory[i+1]];
      translateInOutOpcode(opcode, output, i);
      i += 2;
    }
    else if (opcode == '5' || opcode == '6') {
      // Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the
      // instruction pointer to the value from the second parameter. Otherwise, it does nothing.
      // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction
      // pointer to the value from the second parameter. Otherwise, it does nothing.
      p1 = memory[memory[i+1]];
      if (translateJumpOpcode(opcode, p1)) {
        i = parseInt(memory[memory[i+2]]);
      }
      else {
        // If nothing is happening, skip the two parameters and move onto the next opcode.
        i += 3;
      }
    }
    else if (opcode == '7' || opcode == '8') {
      // Opcode 7 is less than: if the first parameter is less than the second parameter,
      // it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
      // Opcode 8 is equals: if the first parameter is equal to the second parameter,
      //  it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
      p1 = memory[memory[i+1]];
      p2 = memory[memory[i+2]];
      output = memory[i+3];
      if (translateParamCompareOpcode(opcode, p1, p2)) {
        memory[output] = 1;
      }
      else {
        memory[output] = 0;
      }
      i += 4;
    }
    else if (opcode.length > 1) {

      // Pad the rest of the stripped opcode with zeros until there are
      // exactly five digits. This helps us decide the parameter type of 
      // immediate vs position.
      while (opcode.length < 5) {
        opcode = "0" + opcode;
      }

      // Grab the last two digits of the opcode as this is the actual opcode.
      let immediateOpcode = opcode.substring(opcode.length - 2);

      // First three digits of the five digit opcode now  indicate paramters are in position
      // or immediate mode.
      opcode = (opcode.substring(0,opcode.length - 2));

      if (opcode[2] == '0') {
        p1 = memory[memory[i+1]];
      }
      else if (opcode[2] == '1') {
        p1 = memory[i+1];
      }

      if (opcode[1] == '0') {
        p2 = memory[memory[i+2]];
      }
      else if (opcode[1] == '1') {
        p2 = memory[i+2];
      }

      if (immediateOpcode == '01' || immediateOpcode == '02' || immediateOpcode == '07' || immediateOpcode == '08') {
        // This block helps gather the necessary components/paramters for Opcode operations 1,2,7,8.
        output = memory[i+3];
        if (immediateOpcode == '01' || immediateOpcode == '02') {
          memory[output] = translateSumProductOpcode(immediateOpcode, p1, p2);
        }
        else if (immediateOpcode == '07' || immediateOpcode == '08') {
          if (translateParamCompareOpcode(immediateOpcode, p1, p2)) {
            memory[output] = 1;
          }
          else {
            memory[output] = 0;
          }
        }
        i += 4;
      }
      else if (immediateOpcode == '04' || immediateOpcode == '05' || immediateOpcode == '06') {
        // This block helps gather the necessary components/paramters for Opcode operations 4,5,6.
        if (immediateOpcode == '04') { 
          translateInOutOpcode(immediateOpcode, p1, i);
          i += 2;
        }
        else if (immediateOpcode == '05' || immediateOpcode == '06') {
          if (translateJumpOpcode(immediateOpcode, p1)) {
            i = parseInt(p2);
          }
          else {
            // If nothing is happening, skip the two parameters and move onto the next opcode.
            i += 3;
          }
        }
      }
      else {
        reportError(immediateOpcode, i);
        break;
      }
    }
    else {
      reportError(opcode, i);
      break;
    }
  }
  return;
}

function inputReader(line) {
  return line.split(',').slice();
}

// Read the input.txt file and create array from contents.
lineReader.eachLine('input.txt', function(line,last) {
  let input = inputReader(line);
  computeOperations(input);
  if (last) {
    return false; // stop reading
  }
});