function calcFuel(mass) {
  mass = Math.floor(mass/3) - 2;
  if (mass <= 0) {
    return 0;
  }
  else {
    return mass + calcFuel(mass);
  }
}

var total = 0;
const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  var mass = line;
  total += calcFuel(mass);
  if (last) {
    console.log('');
    console.log('Calculated Fuel: ' + total);
    return false; // stop reading
  }
});
