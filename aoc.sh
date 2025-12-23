#!/bin/bash

# Advent of Code runner script
# Usage: ./aoc.sh 2020 10 1
#        ./aoc.sh [year] [day] [part]

if [ $# -ne 3 ]; then
    echo "Usage: ./aoc.sh [year] [day] [part]"
    echo "Example: ./aoc.sh 2020 10 1"
    exit 1
fi

YEAR=$1
DAY=$(printf "%02d" $2)  # Zero-pad the day
PART=$3

FILE_PATH="src/${YEAR}/day${DAY}/part${PART}.js"
DIR_PATH="src/${YEAR}/day${DAY}"

if [ ! -f "$FILE_PATH" ]; then
    echo "File not found: $FILE_PATH"
    exit 1
fi

echo "Running: node part${PART}.js (from $DIR_PATH)"
cd "$DIR_PATH" && node "part${PART}.js"