// --- Day 4: Passport Processing Part 2 ---
// https://adventofcode.com/2020/day/4
// Part2.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

let fieldMap = new Map();
let numValid = 0;

// Though there are eight expected fields, cid is the only optional field
// Return based on field and requirements of that field. 
function validateFieldValue(field, value) {
  if (field !== 'byr' && field !== 'iyr' && field !== 'eyr' && field !== 'hgt' && field !== 'hcl'
      && field !== 'ecl' && field !== 'pid' && field !== 'cid') {
    return false;
  }

  if (field === 'byr' && (Number(value) < 1920 || Number(value) > 2002)) {
    console.log('byr (birth year) too young or too old. Cannot be valid passport');
    return false;
  }

  if (field === 'iyr' && (Number(value) < 2010 || Number(value) > 2020)) {
    console.log('iyr (issue year) too late or too early. Cannot be valid passport');
    return false;
  }

  if (field === 'eyr' && (Number(value) < 2020 || Number(value) > 2030)) {
    console.log('Passport expired or expiration too high . Cannot be valid passport');
    return false;
  }

  if (field === 'hgt') {
    const metric = value.slice(-2);
    const valueInt = Number(value.substring(0, value.length - 2));
    if (metric !== 'in' && metric !== 'cm') {
      console.log('Invalid metric found in height.');
      return false;
    }
    if (metric === 'cm' && (valueInt < 150 || valueInt > 193)) {
      console.log('Invalid metric height');
      return false;
    }
    if (metric === 'in' && (valueInt < 59 || valueInt > 76)) {
      console.log('Invalid imperial height');
      return false;
    }
  }

  if (field === 'hcl') {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if  (value.length != 7 || value.charAt(0) != '#') {
      console.log('Invalid hair color');
      return false;
    }

    const sixChar = value.substring(1);
    if (!sixChar.match(letterNumber)) {
      console.log('Invalid hair color');
     return false;
    }
  }

  if (field === 'ecl' && value != 'amb' && value != 'blu' && value != 'brn' && value != 'gry'
    && value != 'grn' && value != 'hzl' && value != 'oth' ) {
    console.log('Invalid eye color');
    return false
  }

  if (field === 'pid' & value.length != 9) {
    console.log('Invalid Passport ID');
    return false;
  }

  return true;
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
    validatePassport();  // validate generated passport
  }

  console.log(line);
  for (let i = 0; i < tokens.length; i ++) {
    const element = tokens[i];
    const value = tokens[i+1];
    // Validate value based on the element instead of just checking the field
    // for part 2.
    if (validateFieldValue(element, value)) {
      fieldMap[element] = value;continue;
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
