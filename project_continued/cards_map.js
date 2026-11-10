// The deck of cards object
// This uses a map (dictionariy), not an array
// A "DeckOfCards can contain from 1 to 6 standard decks of cards"

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
    this.numCards = numCards
    this.numDecks = numDecks;

    // Map of card name -> number of times drawn since the last shuffle
    this.deck = new Map();
    for (const name of cardNames) {
      this.deck.set(name, 0);
    }
  }

  // Resets every card's draw count to 0 (a fresh shoe)
  shuffle() {
    for (const card of this.deck.keys()) {
      this.deck.set(card, 0);
    }
  }

  // Total number of cards still available to draw
  cardsRemaining() {
    let total = 0;
    for (const count of this.deck.values()) {
      total += this.numDecks - count;
    }
    return total;
  }

  // Draws a random card. Each card can be drawn up to numDecks times
  // before it becomes unavailable until the next shuffle.
  // Returns null when every card has been used up.
  getRandomUnusedCard() {
    const remaining = this.cardsRemaining();
    if (remaining === 0) {
      return null;
    }

    let target = Math.floor(Math.random() * remaining);
    for (const [card, count] of this.deck) {
      target -= this.numDecks - count;
      if (target < 0) {
        this.deck.set(card, count + 1);
        return card;
      }
    }
  }
}