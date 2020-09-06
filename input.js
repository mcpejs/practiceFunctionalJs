const readline = require("readline");

const input = (s = "") =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(s, (a) => {
      rl.close();
      resolve(a);
    });
  });

module.exports = input;
