// The deck of cards object
// This uses a set, not an array

class DeckOfCards {
    constructor(
      deck = new Set(["AC.png", "2C.png", "3C.png", "4C.png", "5C.png", "6C.png",
      "7C.png", "8C.png", "9C.png", "TC.png", "JC.png", "QC.png", "KC.png",
      "AD.png", "2D.png", "3D.png", "4D.png", "5D.png", "6D.png",
      "7D.png", "8D.png", "9D.png", "TD.png", "JD.png", "QD.png", "KD.png",
      "AH.png", "2H.png", "3H.png", "4H.png", "5H.png", "6H.png",
      "7H.png", "8H.png", "9H.png", "TH.png", "JH.png", "QH.png", "KH.png",
      "AS.png", "2S.png", "3S.png", "4S.png", "5S.png", "6S.png",
      "7S.png", "8S.png", "9S.png", "TS.png", "JS.png", "QS.png", "KS.png"]),
      cardBacks = new Array("blue_back.png", "gray_back.png", "green_back.png",
      "purple_back.png", "red_back.png", "yellow_back.png"),
      cardPath = "images/cards/")
      {
        this.deck = deck;
        this.cardBacks = cardBacks;
        this.cardPath = cardPath;
      }
  
    // Gets a random card from a deck of cards
    // Removes the card from the set so it cannot be drawn again
    getRandomUnusedCard() {
      var i = 0;
      var randomNumber = Math.floor(Math.random() * this.deck.size);
      for (var card of this.deck) {
        if (i >= randomNumber) {
          break;
        }
        i++;
      }
      this.deck.delete(card);
      return card;
    }
  
  }
  