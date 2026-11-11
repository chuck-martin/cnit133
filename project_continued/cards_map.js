// The deck of cards object
// This uses a map (dictionariy), not an array
// A "DeckOfCards can contain from 1 to 6 standard decks of cards"

// Fraction of the shoe left when it's time to reshuffle, by number of decks
const RESHUFFLE_AT = { 1: 0.30, 2: 0.30, 3: 0.30, 4: 0.30, 5: 0.25, 6: 0.22 };

// How far the cut card can stray from its target (0.20 = up to 20% either way)
const CUT_CARD_VARIATION = 0.20;

class DeckOfCards {
  constructor(
    cardNames = ["AC.png", "2C.png", "3C.png", "4C.png", "5C.png", "6C.png",
      "7C.png", "8C.png", "9C.png", "TC.png", "JC.png", "QC.png", "KC.png",
      "AD.png", "2D.png", "3D.png", "4D.png", "5D.png", "6D.png",
      "7D.png", "8D.png", "9D.png", "TD.png", "JD.png", "QD.png", "KD.png",
      "AH.png", "2H.png", "3H.png", "4H.png", "5H.png", "6H.png",
      "7H.png", "8H.png", "9H.png", "TH.png", "JH.png", "QH.png", "KH.png",
      "AS.png", "2S.png", "3S.png", "4S.png", "5S.png", "6S.png",
      "7S.png", "8S.png", "9S.png", "TS.png", "JS.png", "QS.png", "KS.png"],
    cardBacks = ["blue_back.png", "gray_back.png", "green_back.png",
      "purple_back.png", "red_back.png", "yellow_back.png"],
    cardPath = "images/cards/",
    numCards = 52,
    numDecks = 1)
  {
    this.cardBacks = cardBacks;
    this.cardPath = cardPath;
    this.numDecks = numDecks;

    this.deck = new Map();
    for (const name of cardNames) {
      this.deck.set(name, 0);
    }

    this.totalCards = this.deck.size * this.numDecks;  // e.g. 312 for 6 decks
    this.cardsLeft = this.totalCards;
    this.placeCutCard();
  }

  // Places the cut card near its target position, the way a dealer
  // would: close to the trained spot, but never exactly the same twice.
  placeCutCard() {
    const fraction = RESHUFFLE_AT[this.numDecks] ?? 0.25;
    const target = this.totalCards * fraction;

    // Average of two random numbers: results cluster near the target,
    // with bigger misses less common, like a human's placement.
    const wobble = (Math.random() + Math.random()) - 1;   // -1 to +1, mostly near 0
    const position = target * (1 + wobble * CUT_CARD_VARIATION);

    this.reshufflePoint = Math.max(10, Math.round(position));  // never closer than 10 cards
  }

  // Resets every card's draw count to 0 (a fresh shoe)
  shuffle() {
    for (const card of this.deck.keys()) {
      this.deck.set(card, 0);
    }
    this.cardsLeft = this.totalCards;
    this.placeCutCard();   // new shuffle, new cut-card position
  }

  // Determines when to reshuffle
  needsShuffle() {
    return this.cardsLeft <= this.reshufflePoint;
  }

  // Draws a random card. Each card can be drawn up to numDecks times
  // before it becomes unavailable until the next shuffle.
  // Returns null when every card has been used up.
  getRandomUnusedCard() {
    if (this.cardsLeft === 0) {
      return null;
    }

    let target = Math.floor(Math.random() * this.cardsLeft);
    for (const [card, count] of this.deck) {
      target -= this.numDecks - count;
      if (target < 0) {
        this.deck.set(card, count + 1);
        this.cardsLeft--;
        return card;
      }
    }
  }
}