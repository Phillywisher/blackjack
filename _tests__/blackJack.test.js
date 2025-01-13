const { Card, Deck, BlackJack } = require("../classes");

describe("BlackJack", () => {
  describe("Cards", () => {
    test("Should correctly assign card value and card suit for number cards", () => {
      const card = new Card(7, "♦️");
      expect(card.value).toBe(7);
      expect(card.suit).toBe("♦️");
      expect(card.cardValue()).toBe(7);
    });
    test("Face cards constructed should return the value of 10", () => {
      const card = new Card("J", "♥️");
      expect(card.cardValue()).toBe(10);
    });
    test("Should correctly assign card value for Ace", () => {
      const card = new Card("A", "♠️");
      expect(card.cardValue()).toBe(11);
      //in blackjack ace can either be 11 or 1, dont forget to update
    });
  });
});
describe("Deck", () => {
  test("Should create a deck of 52 cards", () => {
    const deck = new Deck();
    expect(deck.length).toBe(52);
  });

  test("Should contain all suits and values including aces ", () => {
    const deck = new Deck();
    expect(deck).toContainEqual(
      expect.objectContaining({ value: 2, suit: "♠️" })
    );
    expect(deck).toContainEqual(
      expect.objectContaining({ value: "A", suit: "♦️" })
    );
  });
});
describe("BlackJack", () => {
  beforeEach(() => {
    blackJack = new BlackJack();
  });

  test("Should initialize with a full deck", () => {
    expect(blackJack.cards.length).toBe(52);
  });
  test("should correclty remove cards from the deck when a card is dealt", () => {
    expect(blackJack.cards.length).toBe(52);
    const fullDeck = blackJack.cards.length;
    blackJack.hit();
    expect(blackJack.cards.length).toBe(fullDeck - 1);
  });
  test("Should correctly handle aces", () => {
    const mockDeck = [
      { value: "A", suit: "♠️", cardValue: () => 11 },
      { value: 10, suit: "♠️", cardValue: () => 10 },
    ];
    blackJack.cards = mockDeck;
    blackJack.hit();
    blackJack.hit();
    expect(blackJack.score).toBe(21);
  });
  test("Should correctly handle face cards", () => {
    const mockDeck = [
      { value: "K", suit: "♠️", cardValue: () => 10 },
      { value: 10, suit: "♠️", cardValue: () => 10 },
    ];
    blackJack.cards = mockDeck;
    blackJack.hit();
    blackJack.hit();
    expect(blackJack.score).toBe(20);
  });
  test("Should correctly handle number cards", () => {
    const mockDeck = [
      { value: 5, suit: "♠️", cardValue: () => 5 },
      { value: 10, suit: "♠️", cardValue: () => 10 },
    ];
    blackJack.cards = mockDeck;
    blackJack.hit();
    blackJack.hit();
    expect(blackJack.score).toBe(15);
  });
  test("Should correctly handle bust", () => {
    const mockDeck = [
      { value: 10, suit: "♠️", cardValue: () => 10 },
      { value: 10, suit: "♠️", cardValue: () => 10 },
      { value: 10, suit: "♠️", cardValue: () => 10 },
    ];
    blackJack.cards = mockDeck;
    blackJack.hit();
    blackJack.hit();
    blackJack.hit();
    expect(blackJack.score).toBe(30);
  });
  test("Should correctly handle blackjack", () => {
    const mockDeck = [
      { value: "A", suit: "♠️", cardValue: () => 11 },
      { value: 10, suit: "♠️", cardValue: () => 10 },
    ];
    blackJack.cards = mockDeck;
    blackJack.hit();
    blackJack.hit();
    expect(blackJack.score).toBe(21);
  });
});
