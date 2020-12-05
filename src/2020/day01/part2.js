const lineReader = require('line-reader');
const year = 2020;
let yearsMap = new Map();

function store(current, searchNum) {
  // No entries found for x2 keys that will sum to searchNum.
  // Add the searchNum as a value to the yearMap with current line
  // as key.
  if (!yearsMap[current]) {
    yearsMap[current] = searchNum;
  }
}

function search() {
  // Using yearsMap, take two keys and take their sum.
  // Find the difference between the year (2020) and this sum and see if this difference
  // exists as a key.
  let keys = Object.keys(yearsMap);
  for (let i = 0 ; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const key1 = Number(keys[i]);
      const key2 = Number(keys[j]);
      const sum = key1 + key2;

      if (sum >= 2020) {
        continue;
      }

      // Having two keys with sum less than 2020, see if there is a key
      // if 2020 - sum 
      const search = 2020 - sum;
      if (!yearsMap[search]) {
        continue;
      }

      // Reaching here indicates there are 3 entries in which their values 
      // total 2020. Calculate their products.
      const prod = key1 * key2 * search;
      console.log('Entries that sum to 2020 are : ' + key1 + ' ' + key2 + ' ' + search);
      console.log(prod);
    }
  }
}

lineReader.eachLine('input.txt', function(line,last) {
  const current = Number(line);
  const searchNum = year - current;

  // Store each item into yearsMap.
  store(current, searchNum);

  if (last) {
    search();
    return false; // stop reading
  }
});