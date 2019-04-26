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
    switch(this.hand[this.hand.length - 1].charAt(0)) {
      // number cards
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.handTotal += parseInt(this.hand[this.hand.length - 1].charAt(0));
        break;
      // 10 and face cards
      case "T":
      case "J":
      case "Q":
      case "K":
        this.handTotal += 10;
        break;
      // Its an ace!
      default:
        this.handTotal += 1;
        this.aceInHand = true;
    }
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
  
  // add the card to a hand
  if (turn == "player") {
    // Add the card to the player hand array
    player.hand.push(dealtCard);
    player.updateHandTotal();
    document.getElementById("playerheader").innerHTML = player.handTotal.toString();
    turn = "dealer";
  } else {
    // Add the card to the dealer hand array
    dealer.hand.push(dealtCard);
    dealer.updateHandTotal();
    document.getElementById("dealerheader").innerHTML = dealer.handTotal.toString();
    turn = "player";
  }
  // Update the card display on the page
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