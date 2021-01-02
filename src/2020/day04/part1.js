// --- Day 4: Passport Processing Part 1 ---
// https://adventofcode.com/2020/day/4
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

let fieldMap = new Map();
let numValid = 0;

// Though there are eight expected fields, cid is the only optional field
function isExpectedField(field) {
  if (field === 'byr' || field === 'iyr' || field === 'eyr' || field === 'hgt' || field === 'hcl'
      || field === 'ecl' || field === 'pid' || field === 'cid') {
    return true;
  }
  return false;
}

// FieldMaps of length greater/equal to 7,  just check whether cid
// is included. Since it is an optional field,
// We can use the length to see if the remaining seven other fields exist
// for validity.
function isValidPassport() {
  const fieldMapLength = Object.keys(fieldMap).length
  if (fieldMapLength < 7) {
    console.log('Not enough fields to even consider validty. Returning false.');
    return false;
  }

  if (fieldMapLength === 7 && fieldMap['cid']) {
    console.log('Only seven fields with one being the optional. Returning false.');
    return false;
  } 

  if ((fieldMapLength === 7 && !fieldMap['cid']) || fieldMapLength > 7) {
    return true;
  }

  return false;
}

function validatePassport() {
  if (isValidPassport()) {
    numValid++;
  }
  fieldMap = new Map();
  return;
}

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {

  const tokens = line.split(/[\s:]+/);
  if (tokens.length == 1 && tokens[0] === '') {
    validatePassport(fieldMap);  // validate generated passport
  }

  console.log(line);
  for (let i = 0; i < tokens.length; i++) {
    const element = tokens[i];
    if (isExpectedField(element)) {
      const value = tokens[i+1]
      fieldMap[element] = value;
    }
  }

  if (last) {
    validatePassport(); // last line may mean not running into blank line to validate
    console.log();
    console.log('NUMBER OF VALID PASSPORTS: ' + numValid);
    console.log();
    return false; // stop reading
  }
});
