const _ = require("fxjs/Strict");
const L = require("fxjs/Lazy");
const curry = require("fxjs/Strict/curry");
const input = require("./input.js");

function* popRandomElement(array) {
  while (array) {
    let randomindex = Math.floor(Math.random() * array.length);
    let ele = array[randomindex];
    array.splice(randomindex, 1);
    yield ele;
  }
}
_.size = (iter) => Object.keys(iter).length;

const countBall = curry((dest, src) =>
  _.go(
    src,
    _.filter((char) => dest.includes(char)),
    _.size
  )
);

const countStrike = curry((dest, src) =>
  _.go(
    Object.keys(src),
    _.filter((i) => dest[i] == src[i]),
    _.size
  )
);


// 메인
async function main() {
  const answerLength = 3;

  const answer = _.go(
    _.range(1, 10),
    popRandomElement,
    L.take(answerLength),
    _.join("")
  );
  console.log(`\n정답: ${answer}`);
  const countBallFromAnswer = countBall(answer);
  const countStrikeFromAnswer = countStrike(answer);

  let finishFlag;
  while (!finishFlag) {
    const guess = await input("\n입력: ");
    const strike = countStrikeFromAnswer(guess);
    const ball = countBallFromAnswer(guess) - strike;
    finishFlag = strike == answerLength;
    console.log(`볼:${ball} 스트라이크:${strike}`);
  }
  console.log('정답입니다!')
}

main();