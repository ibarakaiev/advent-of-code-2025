const fs = require("fs");

const input = fs.readFileSync("day01.txt", "utf8").trim();
const rows = input.trim().split("\n");

let password = 0;

let position = 50;
for (const row of rows) {
  let rotation = parseInt(row.slice(1));
  if (row[0] === "R") {
    while (rotation-- > 0) {
      position++;
      if (position % 100 === 0) {
        position = 0;
        password++;
      }
    }
  } else if (row[0] === "L") {
    while (rotation-- > 0) {
      position--;
      if (position === 0) {
        password++;
      }
      if (position < 0) {
        position += 100;
      }
    }
  } else {
    throw "error";
  }
}

console.log(password);
