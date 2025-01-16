const readline = require("readline");

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  cardValue() {
    if (this.value === "J" || this.value === "Q" || this.value === "K") {
      return 10;
    }
    if (this.value === "A") {
      return 11;
    }
    return this.value;
  }
}
class Deck {
  constructor() {
    let cards = [];
    const suits = ["♥️", "♦️", "♣️", "♠️"];
    for (let value = 2; value < 11; value++) {
      for (const suit of suits) {
        const card = new Card(value, suit);
        cards.push(card);
      }
    }
    const faceCards = ["J", "Q", "K", "A"];
    for (const faceCard of faceCards) {
      for (const suit of suits) {
        const card = new Card(faceCard, suit);
        cards.push(card);
      }
    }
    console.log(cards);
    return cards;
  }
}
class BlackJack {
  constructor() {
    this.cards = new Deck();
    this.score = 0;
    this.aces = [];
    console.log("Welcome to BlackJack.");
  }

  hit() {
    const card = this.cards[Math.floor(Math.random() * this.cards.length)];
    const index = this.cards.indexOf(card);

    this.cards.splice(index, 1);

    console.log(
      `${this.cards.length} cards left, ${card.value}${
        card.suit
      } was removed with value ${card.cardValue()}.`
    );
    const gamePlayStatus = this.checkScore(card);
    return { card: card, gamePlayStatus: gamePlayStatus, score: this.score };
  }

  checkScore(card) {
    const cardValue = card.cardValue();
    this.score += cardValue;

    if (cardValue === 11) {
      this.aces.push(card);
    }
    while (this.score > 21 && this.aces.length > 0) {
      console.log(
        "Changing the Value of your Ace from 11 to 1 to avoid letting the dealer win!"
      );
      this.score -= 10;
      this.aces.pop();
    }

    console.log(this.score);
    if (this.score === 21) {
      return "blackJack";
    } else if (this.score > 21) {
      return "bust";
    } else {
      return "continue";
    }
  }

  getScore() {
    return this.score;
  }

  computerScore() {
    const score = Math.floor(Math.random() * (21 - 18) + 18);
    return score;
  }

  stand() {
    const playerScore = this.getScore();
    const computerScore = this.computerScore();
    const playerScoreDiff = 21 - playerScore;
    const computerScoreDiff = 21 - computerScore;

    if (computerScore > 21) {
      console.log(
        `You won with ${playerScore} and the computer lost with ${computerScore}`
      );
    } else {
      if (computerScoreDiff === playerScoreDiff) {
        console.log(
          `Tie!, computer score is ${computerScore} and your score is ${playerScore}`
        );
      } else if (computerScoreDiff < playerScoreDiff) {
        console.log(
          `You lost with ${playerScore} and the computer won with ${computerScore}`
        );
      } else {
        console.log(
          `You won with ${playerScore} and the computer lost with ${computerScore}`
        );
      }
    }
  }
}

module.exports = { Card, Deck, BlackJack };
