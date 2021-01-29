// --- Day 7: Report Repair Part 2 ---
// https://adventofcode.com/2020/day/7
// Part2.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

var removeUselessWords = function(txt) {
  const uselessWordsArray = [' bags', ' bag'];
  const expStr = uselessWordsArray.join("|");
  let filterStr = txt.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
                      .replace(/\s{2,}/g, ' ');

  // strip out any line endings, whether thats ' ', '.' or both ' .'
  if (filterStr.slice(-2) === ' .') {
    filterStr = filterStr.substring(0, filterStr.length - 2);
  } else if (filterStr.charAt(filterStr.length - 1) === ' ' || filterStr.charAt(filterStr.length - 1) === '.') {
    filterStr = filterStr.substring(0, filterStr.length - 1);
  }
  return filterStr;
}

function addToBagObj(rules) {
  let bagObj = {};
  let textByLine = text.split('\n').forEach(rules => {
    const initBag = rules.substring(0, rules.indexOf(' bags contain '));
    const bagRules = rules.substring(rules.indexOf(' bags contain ',) + 14);
    const bagRulesList = {};
    const bagRulesArr = bagRules.split(', ');
    for (let i = 0; i < bagRulesArr.length; i++) {
      let element = bagRulesArr[i];
      if (element === 'no other bags.') {
        return;
      }
      // First character is always numerical number of bags
      // Also remove bags, extra spaces, characters at end (if exists)
      const num = element.charAt(0);
      element = removeUselessWords(element.substring(2));
      bagRulesList[element] = num;
    }
    bagObj[initBag] = bagRulesList;
  });
  return bagObj;
}

// Count number of bags that could potentially be inside a shiny gold bag.
function whatsInMyShinyBag(text) {
  const bagRules = addToBagObj(text);
  let currentLevelOfBags = bagRules["shiny gold"];
  let bagVals = Object.values(currentLevelOfBags);
  let numberInside = bagVals.reduce((a, b) => Number(a) + Number(b), 0);

  while (Object.keys(currentLevelOfBags).length > 0) {
    let sumOfBags = bagVals.reduce((a, b) => Number(a) + Number(b), 0)
    currentLevelOfBags = getNextLevel(currentLevelOfBags, bagRules);
    numberInside += numberInside + sumOfBags;
    bagVals = Object.values(currentLevelOfBags);
  }
  return numberInside;
}

// Retrieve next batch of bags that we need to search
function getNextLevel(currentLevelOfBags, bagRules) {
  var nextLevelOfBags = {};
  Object.keys(currentLevelOfBags).forEach(bag => {
    if (bagRules[bag]) {
      Object.assign(nextLevelOfBags, bagRules[bag]);
    }
  })
  return nextLevelOfBags;
}

console.log('Final Number of Bags: ' + whatsInMyShinyBag(text)); // the answer
