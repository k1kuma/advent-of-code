const lineReader = require('line-reader');
const readlineSync = require('readline-sync');

function translateSumProductOpcode(op, p1, p2) {
  if (op == '01' || op == '1') {
    return Math.floor(parseInt(p1) + parseInt(p2));
  }
  else if (op == '02' || op == '2') {
    return Math.floor(parseInt(p1) * parseInt(p2));
  }
}

function translateInOutOpcode(op, p1,index) {
  if (op == '03' || op == '3') {
    return readlineSync.question('Opcode 03: Provide input? ');
  }
  else if (op == '04' || op == '4') {
      console.log('Opcode 04: '+ p1 + ' at index ' + index);
  }
}

function reportError(opcode) {
  if (immediateOpcode != undefined) {
    console.log('INVALID OPCODE, PROGRAM WILL FAIL:' + opcode);
  }
  else {
    console.log('INVALID OPCODE, PROGRAM WILL FAIL');
  }
  
  return;
}

function computeOperations(memory) {
  for (let i = 0 ; i < memory.length; i++) {
    // Setup the potential paramters needed to process the opcodes.
    let opcode = '' + memory[i];

    if (opcode == '99') {
      break;
    }

    let p1;
    let p2;
    let output;

    // Position Mode
    if (opcode == '1' || opcode == '2') {

      p1 = memory[memory[i+1]];
      p2 = memory[memory[i+2]];
      output = memory[i+3];

      memory[output] = translateSumProductOpcode(opcode, p1, p2);
      i += 3;
    }
    else if (opcode == '3') {
      output = memory[i+1];
      memory[output] = translateInOutOpcode(opcode, output);
      i++;
    }
    else if (opcode == '4') {
      output = memory[memory[i+1]];
      translateInOutOpcode(opcode, output, i);
      i++;
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

      // If the immediate opcode is 01 or 02, gather the necessary parameters.
      if (immediateOpcode == '01' || immediateOpcode == '02') {

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

        output = memory[i+3];
        memory[output] = translateSumProductOpcode(immediateOpcode, p1, p2);
        i += 3;
      }
      else if (immediateOpcode == '04') {

        // Only worried about the first parameter on an opcode 4 operation.
        if (opcode[2] == '0') {
          p1 = memory[memory[i+1]];
        }
        else if (opcode[2] == '1') {
          p1 = memory[i+1];
        }

        translateInOutOpcode(immediateOpcode, p1, i);
        i++;
      }
      else {
        reportError(immediateOpcode);
        break;
      }
    }
    else {
      reportError(opcode);
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
  const input = inputReader(line);
  computeOperations(input);
  if (last) {
    return false; // stop reading
  }
});