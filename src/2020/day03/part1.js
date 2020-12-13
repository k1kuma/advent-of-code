/*
--- Day 3: Toboggan Trajectory ---
With the toboggan login problems resolved, you set off toward the airport. 
While travel by toboggan might be easy, it's certainly not safe: there's 
very minimal steering and the area is covered in trees. You'll need to see 
which angles will take you near the fewest trees.

Due to the local geology, trees in this area only grow on exact integer 
coordinates in a grid. You make a map (your puzzle input) of the open
squares (.) and trees (#) you can see. For example:

..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#

These aren't the only trees, though; due to something you read about once
involving arboreal genetics and biome stability, the same pattern repeats
to the right many times:

..##.........##.........##.........##.........##.........##.......  --->
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->

You start on the open square (.) in the top-left corner and need to reach
the bottom (below the bottom-most row on your map).

The toboggan can only follow a few specific slopes (you opted for a cheaper
model that prefers rational numbers); start by counting all the trees you
would encounter for the slope right 3, down 1:

From your starting position at the top-left, check the position that is
right 3 and down 1. Then, check the position that is right 3 and down 1
from there, and so on until you go past the bottom of the map.

The locations you'd check in the above example are marked here with O
where there was an open square and X where there was a tree:

..##.........##.........##.........##.........##.........##.......  --->
#..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
.#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........X.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...#X....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
In this example, traversing the map using this slope would cause you to encounter 7 trees.

Starting at the top-left corner of your map and following a slope of right 3 and down 1, how
many trees would you encounter?

Your puzzle answer was 198.
*/

let x = 0;
let y = 0;
let treeCount = 0;

const lineReader = require('line-reader');
lineReader.eachLine('input.txt', function(line,last) {
  let modulo = x % 31;
  let indexChar = line.charAt(modulo);

  // To build visual parsing for console.log
  let lineStr = '';
  if (modulo == 30) {
    lineStr = line.substring(0, modulo) + '(' + indexChar + ')';
  } else {
    lineStr = line.substring(0, modulo) + '(' + indexChar + ')'
      + line.substring(modulo + 1, line.length);
  }
  lineStr += ' - searching index ' + modulo + ' === line ' + y;
  
  // Need to fix line 
  console.log(lineStr);

  // Increment treeCount if the indexChar is a '#' sign
  if (indexChar === '#') {
    treeCount++;
  }

  // Increment x by 3 for next line
  x += 3;
  y++;

  if (last) {
    console.log(treeCount);
    return false; // stop reading
  }
});
