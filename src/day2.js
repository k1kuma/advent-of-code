// // 1. Create a new XMLHttpRequest object
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// let xhr = new XMLHttpRequest();

// // 2. Configure it: GET-request for the URL /article/.../load
// //    and Send the request over the network
// xhr.open('GET', 'https://adventofcode.com/2019/day/2/input');
// xhr.send();

// // 4. This will be called after the response is received
// xhr.onload = function() {
//   if (xhr.status != 200) { // analyze HTTP status of the response
//     console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
//   } else { // show the result
//     console.log(`Done, got ${xhr.response.length} bytes`); // responseText is the server
//   }
// };

// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     console.log(`Received ${event.loaded} of ${event.total} bytes`);
//   } else {
//     console.log(`Received ${event.loaded} bytes`); // no Content-Length
//   }
// };

// xhr.onerror = function() {
//   console.log("Request failed");
// };

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
  else {
    return false;
  }
  
  return;
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
lineReader.eachLine('input_day2.txt', function(line,last) {
// lineReader.eachLine('sample.txt', function(line,last) {
  findNounAndVerb(line);
  if (last) {
    return false; // stop reading
  }
});