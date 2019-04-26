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
    var testCard = "";
    // loop through the cards
    for (var i=0; i < this.hand.length; i++) {
      // Get the first character, which is the card rank
      testCard += this.hand[i].charAt(0);
      alert(testCard);
      // number card
      if (testCard == "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9") {
        this.handTotal += parseInt(testCard);
        // face card
      } else if (testCard == "T" || "J" || "Q" || "K") {
        this.handTotal += 10;
        alert(this.handTotal);
      } else {
        // It's an ace
        this.handTotal += 1;
        this.aceInHand = true;
      }
    }
    // alert(this.hand, + ", " + this.handTotal);
  }




}
function newGame() {
  // create player & dealer instances 
  gameDeck = new DeckOfCards;
  player = new BlackjackHand;
  dealer = new BlackjackHand;
  document.getElementById("dealer").innerHTML = "";
  document.getElementById("player").innerHTML = "";
  // drawnCards = 0;
  // usedCards = new Array(52);
}



// This deals a card to the appropriate spot
function dealCard() {
  var dealtCard = gameDeck.getRandomUnusedCard();
  // alert(dealtCard);
  // test if card is dealt already
  /*
  while (gameDeck.usedCards[dealtCard] == "drawn") {
    dealtCard = gameDeck.getRandomUnusedCard();
  }
*/
  
    // add the card to a hand
    if (turn == "player") {
      player.hand.push(dealtCard);
      // player.updateHandTotal();
      // document.getElementById("playerheader").innerHTML = player.handTotal.toString();
      turn = "dealer";
    } else {
      dealer.hand.push(dealtCard);
      // dealer.updateHandTotal();
      // document.getElementById("dealerheader").innerHTML = dealer.handTotal.toString();
      turn = "player";
    }
  
  displayCards();
}

// lays out all the dealt cards on the page
function displayCards() {
  // dealer cards
  var cardHTML = "";
  for (var i = 0; i < dealer.hand.length; i++) {
    cardHTML += "<img src='" + gameDeck.cardPath + dealer.hand[i] + "'>";
  }
  document.getElementById("dealer").style.width = (i * 100) + "px";
  document.getElementById("dealer").innerHTML = cardHTML;

  // player cards
  var cardHTML = "";
  for (var i = 0; i < player.hand.length; i++) {
    cardHTML += "<img src='" + gameDeck.cardPath + player.hand[i] + "'>";
  }
  document.getElementById("player").style.width = (i * 100) + "px";
  document.getElementById("player").innerHTML = cardHTML;
}