/* Class project
Chuck Martin
CNIT 133
Spring 2019 */

// This is the code for a blackjack game

// Class for blackjack hands
class BlackjackHand {
  constructor(
    cards = new Array(),
    handTotal =  0,
    aceInHand = false,
    dealerShowsAce = false,
    sameCardRank = false)
    {
      this.cards = cards;
      this.handTotal = handTotal;
      this.aceInHand = aceInHand;
      this.dealerShowsAce = dealerShowsAce;
      this.sameCardRank = sameCardRank;
    }

// When a card is dealt, updates the total for that hands
// There can be more than one total if a hand contains one or more aces
  updateHandTotal() {
    // Test if there are any cards
    if (cards.length > 0) {
      loop through the cards
      for (i=0; i < cards.length; i++) {
        // Get the first character, which is the card rank
        var testCard += cards[i].charAt(0);
        // number card
        if (testCard == "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9") {
          handTotal += parseInt(testCard);
          // face card
        } else if (testCard == "T" || "J" || "Q" || "K") {
          handTotal += 10;
        } else {
          // It's an ace
          handTotal += 1;
          aceInHand = true;
        }
      }
    }
  }




}
