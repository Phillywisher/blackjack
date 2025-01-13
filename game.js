const readline = require("readline");
const { BlackJack } = require("./classes");

const blackjack = new BlackJack();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const gamePlay = () => {
  rl.question(" please choose to hit or stand", (answer) => {
    if (answer === "hit") {
      blackjack.hit();

      if (blackjack.score === 21) {
        console.log(`Well Done You Hit blackjack!`);
        return rl.close();
      }

      if (blackjack.score > 21) {
        console.log(`Better luck next time.`);
        return rl.close();
      }
    }

    if (answer === "stand") {
      blackjack.stand();
      return rl.close();
    }
    gamePlay();
  });
};

module.exports = gamePlay;
