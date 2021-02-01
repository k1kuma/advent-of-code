// --- Day 7: Handy Haversacks Part 1 ---
// https://adventofcode.com/2020/day/7
// Part1.js
// Matt Kikuchi (https://github.com/k1kuma)
// ----------------------------------------

var fs = require("fs");
var text = fs.readFileSync("./input.txt", "utf-8");

// Remove bags, or bag from each rule.
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

function addToBagObj(text) {
  let bagObj = {};
  text.split('\n').forEach(rules => {
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
      const num = element.charAt(0);
      element = element.substring(2);

      // Remove bags, extra spaces, characters at end (if exists)
      element = removeUselessWords(element);

      bagRulesList[element] = num;
    }
    bagObj[initBag] = bagRulesList;
  });

  return bagObj;
}

// Find bag rules that contain the 'shiny gold' bag.
function findGold(bagRules) {

  let hasGold = [];

  // Count any bags that have shiny gold bags in their rule
  const bagKeys = Object.keys(bagRules);
  const bagValues = Object.values(bagRules);
  for (let i = 0; i < bagValues.length; i++ ) {
    let keysArr = Object.keys(bagValues[i]);
    for (let j = 0; j < keysArr.length; j++) {
      if (keysArr[j] == 'shiny gold') {
        // Add these bags that accepy shiny gold
        hasGold.push(bagKeys[i]);
      }
    }
  }

  return hasGold;
}

// Search the bags that are part of the rule and 
// have not yet been listed as a bag that can hold
// shiny gold bags
function bagSearch(bagRules, colours) {

  var localBagLength = colours.length;

  while (true) {
      colours = findColour(bagRules, colours)
      if (colours.length === localBagLength) {
          return colours;
      } else {
          localBagLength = colours.length;
      }

  }
}

// Takes the entire list of bag rules and the colours that 
// already contain shiny gold bags and adds any more bags that contain
// those bags that contain gold bags.
// This continues until there are no parent bags left that can hold bags
// that eventually hold shiny gold bags.
function findColour(bagRules, colours) {
  const bagKeys = Object.keys(bagRules);
  const bagValues = Object.values(bagRules);

  colours.forEach(colour => {
    for (let i = 0; i < bagValues.length; i++ ) {
      const bagRule = bagKeys[i];
      const keysArr = Object.keys(bagValues[i]);
      for (let j = 0; j < keysArr.length; j++) {
        if (colours.indexOf(bagRule) === -1 && keysArr[j] === colour) {
          colours.push(bagRule);
        }
      }
    }
  });
  return colours;
}

// Main function that will create bagObj and find
// the bags that will hold.
function howManyBags(text) {
  const bagRules = addToBagObj(text);
  const colours = findGold(bagRules);
  return bagSearch(bagRules, colours).length;
}

console.log(howManyBags(text));
