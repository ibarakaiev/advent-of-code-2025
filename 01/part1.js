const fs = require("fs");

const input = fs.readFileSync("day01.txt", "utf8").trim();
const rows = input.trim().split("\n");

let password = 0;

let position = 50;
for (const row of rows) {
  const rotation = parseInt(row.slice(1));
  if (row[0] === "R") {
    position = (position + rotation) % 100;
  } else if (row[0] === "L") {
    position =
      (position - rotation + Math.floor(rotation / 100 + 1) * 100) % 100;
  } else {
    throw "error";
  }

  if (position === 0) {
    password++;
  }
}

console.log(password);
