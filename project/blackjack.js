/* Class project
Chuck Martin
CNIT 133
Spring 2019 */

// This is the code for a blackjack game

window.onload = newGame;


// Set up initial variables
var turn = "player";
var player;
var dealer;

// Class for blackjack hands
class BlackjackHand {
  constructor(
    hand = new Array(),
    handTotal =  0,
    aceInHand = false,
    dealerShowsAce = false,
    sameCardRank = false)
    {
      this.hand = hand;
      this.handTotal = handTotal;
      this.aceInHand = aceInHand;
      this.dealerShowsAce = dealerShowsAce;
      this.sameCardRank = sameCardRank;
    }

// When a card is dealt, updates the total for that hands
// There can be more than one total if a hand contains one or more aces
  updateHandTotal() {
    var testCard;
    // Test if there are any cards
    if (cards.length > 0) {
      // loop through the cards
      for (var i=0; i < cards.length; i++) {
        // Get the first character, which is the card rank
        testCard += cards[i].charAt(0);
        // number card
        if (testCard == "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9") {
          this.handTotal += parseInt(testCard);
          // face card
        } else if (testCard == "T" || "J" || "Q" || "K") {
          this.handTotal += 10;
        } else {
          // It's an ace
          this.handTotal += 1;
          this.aceInHand = true;
        }
      }
    }
  }




}
function newGame() {
  // create player & dealer instances 
  player = new BlackjackHand;
  dealer = new BlackjackHand;
  document.getElementById("dealer").innerHTML = "";
  document.getElementById("player").innerHTML = "";
  drawnCards = 0;
  usedCards = new Array(52);
}



// This deals a card to the appropriate spot
function dealCard() {
  var dealtCard = Math.floor(Math.random() * cards.length)
  // test if card is dealt already
  if (usedCards[dealtCard] == "drawn") {
    getRandomUnusedCard();
  }
  else {
    // add the card to a hand
    if (turn == "player") {
      player.hand.push(cards[dealtCard]);
      player.updateHandTotal();
      turn = "dealer";
    } else {
      dealer.hand.push(cards[dealtCard]);
      dealer.updateHandTotal();
      turn = "player";
    }
  }
  displayCards();
}

// lays out all the dealt cards on the page
function displayCards() {
  // dealer cards
  var cardHTML = "";
  for (var i = 0; i < dealer.hand.length; i++) {
    cardHTML += "<img src='" + cardPath + dealer.hand[i] + "'>";
  }
  document.getElementById("dealer").style.width = (i * 100) + "px";
  document.getElementById("dealer").innerHTML = cardHTML;

  // player cards
  var cardHTML = "";
  for (var i = 0; i < player.hand.length; i++) {
    cardHTML += "<img src='" + cardPath + player.hand[i] + "'>";
  }
  document.getElementById("player").style.width = (i * 100) + "px";
  document.getElementById("player").innerHTML = cardHTML;
}