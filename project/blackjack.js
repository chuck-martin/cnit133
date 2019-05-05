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
var gameDeck;
var cardBack;
var newDeal = true;
var playerDollars = 1000;
var betAmount;



// Class for blackjack hands
class BlackjackHand {
  constructor(
    hand = new Array(),
    cards = new Array(),
    handTotal =  0,
    aceInHand = false,
    dealerShowsAce = false,
    sameCardRank = false)
    {
      this.hand = hand;
      this.cards = cards;
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
  // Get bet amount
  /*
  betAmount = window.prompt("How much money would you like to bet? (Enter 1 to " + playerDollars + ")");
  if (parseInt(betAmount) == NaN) {
    betAmount = window.prompt("No number entered\nHow much money would you like to bet? (Enter 1 to " + playerDollars + ")");
  } else if (parseInt(betAmount) < 0 || parseInt(betAmount) > playerDollars) {
      betAmount = window.prompt("Invalid amount entered\nHow much money would you like to bet? (Enter 1 to " + playerDollars + ")");
  } else  if (parseInt(betAmount) == 0) {
      alert("Thanks for playing!");
      return;
  } else {
      playerDollars -= parseInt(betAmount);
  }
  */
  // create player & dealer instances 
  gameDeck = new DeckOfCards;
  player = new BlackjackHand;
  dealer = new BlackjackHand;
  cardBack = gameDeck.cardBacks[Math.floor(Math.random() * gameDeck.cardBacks.length)];
  document.getElementById("deck").src = gameDeck.cardPath + cardBack;
  document.getElementById("dealer").innerHTML = "";
  document.getElementById("dealer").style.width = "0px";
  document.getElementById("dealerheader").style.visibility = "hidden";
  document.getElementById("player").innerHTML = "";
  document.getElementById("player").style.width = "0px";
  document.getElementById("playermoney").innerHTML = "$" + playerDollars.toString();
  initialDeal();
}

// Deal 4 cards, 2 each
function initialDeal() {
  for (var i = 0; i < 4; i++) {
    if (turn == "player") {
      dealPlayerCard();
      turn = "dealer";
    } else {
      dealDealerCard();
      turn = "player";
    }
  }

  if (dealer.hand[1].charAt(0) == "A") {
    dealer.dealerShowsAce = true;
  }

  // Test for blackjacks
  // If player gets blackjack, player wins, game over, start new game
  if (isBlackJack(player)) {
    alert("You win!");
    playerDollars += betAmount * 2.5;
    document.getElementById("playermoney").innerHTML = "$" + playerDollars.toString();
    showAllDealerCards();
    // Player doesn't have blackjack, but if dealer gets blackjack, dealer wins, game over, start new game
  } else if (isBlackJack(dealer)) {
    showAllDealerCards();
    alert("Dealer wins!");
    playerDollars -= betAmount;
    document.getElementById("playermoney").innerHTML = "$" + playerDollars.toString();
  }

  // insurance();
}

function dealPlayerCard() {
  // Add the card to the player hand array
  player.hand.push(gameDeck.getRandomUnusedCard());
  // add the HTML necesary to display the card to the cards array
  player.cards.push("<img src='" + gameDeck.cardPath + player.hand[player.hand.length - 1] + "'>");
  player.updateHandTotal();
  if (player.aceInHand) {
    document.getElementById("playerheader").innerHTML = player.handTotal.toString() + " or " + (player.handTotal + 10).toString();
  } else {
    document.getElementById("playerheader").innerHTML = player.handTotal.toString();
  }
  // Update the display of player cards
  document.getElementById("player").style.width = (player.hand.length * 100) + "px";
  document.getElementById("player").innerHTML += player.cards[player.cards.length - 1];
  if (player.handTotal > 21) {
    alert("Dealer wins!");
    // No need to update player amount; it was already taken when it was bet
  }
}

function dealDealerCard() {
  // Add the card to the dealer hand array
  dealer.hand.push(gameDeck.getRandomUnusedCard());
  // add the HTML necesary to display the card to the cards array
  if (dealer.hand.length == 1) {
    dealer.cards.push("<img src='" + gameDeck.cardPath + cardBack + "'>");
  } else {
    dealer.cards.push("<img src='" + gameDeck.cardPath + dealer.hand[dealer.hand.length - 1] + "'>");
  }
  dealer.updateHandTotal();
  if (dealer.aceInHand) {
    document.getElementById("dealerheader").innerHTML = dealer.handTotal.toString() + " or " + (dealer.handTotal + 10).toString();
  } else {
    document.getElementById("dealerheader").innerHTML = dealer.handTotal.toString();
  }
  // Update the display of dealer cards
  if (dealer.cards.length < 3) {
    // On the initial deal, deel the first card as a card back
    document.getElementById("dealer").style.width = (dealer.hand.length * 100) + "px";
    document.getElementById("dealer").innerHTML += dealer.cards[dealer.cards.length - 1];
  } else {
    showAllDealerCards();
  }
  
}


function dealDealerCards() {
  newDeal = false;
  document.getElementById("dealerheader").style.visibility = "visible";
  if (dealer.handTotal >= 17) {
    showAllDealerCards();
  } else {
    while (dealer.handTotal < 17) {
      sleep(500);
      dealDealerCard();
    }
  }
}

function showAllDealerCards() {
  dealer.cards[0] = "<img src='" + gameDeck.cardPath + dealer.hand[0] + "'>";
  document.getElementById("dealer").style.width = (dealer.hand.length * 100) + "px";
  var tempHTML = "";
  for (var i = 0; i < dealer.cards.length; i++) {
    tempHTML += dealer.cards[i];
  }
  document.getElementById("dealer").innerHTML = tempHTML;
}

// This is a little funciton I found to add a wait to JavaScript
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Tests if a 2-card hand is blackjack, that is, totals 11 with an ace (which is also 21 with 2 cards)
function isBlackJack(testhand) {
  if (testhand.hand.length == 2 && testhand.handTotal == 11 & testhand.aceInHand) {
    return true;
  } else {
    return false;
  }
}

function insurance() {
  if (dealer.dealerShowsAce) {
    if (confirm("Do you want insurance?")) {
      alert("yes");
    } else {
      alert("no");
    }
  }
}

function declareWinner() {
  if (player.handTotal > dealer.handTotal) {
    alert("Player wins!");
    playerDollars += betAmount * 2;
    document.getElementById("playermoney").innerHTML = "$" + playerDollars.toString();
    showAllDealerCards();
  } else if (dealer.handTotal > player.handTotal) {
    alert("Dealer wins!");
    // No need to update player amount; it was already taken when it was bet
  } else {
    alert("Push!");
    playerDollars += betAmount;
    document.getElementById("playermoney").innerHTML = "$" + playerDollars.toString();
    showAllDealerCards();
  }
}


// Old code, not used

// This deals a single card to the appropriate spot
function dealCard() {
  var dealtCard = gameDeck.getRandomUnusedCard();
  
  // add the card to a hand
  if (turn == "player") {
    // Add the card to the player hand array
    player.hand.push(dealtCard);
    player.updateHandTotal();
    if (player.aceInHand) {
      document.getElementById("playerheader").innerHTML = player.handTotal.toString() + " or " + (player.handTotal + 10).toString();
    } else {
      document.getElementById("playerheader").innerHTML = player.handTotal.toString();
    }
    turn = "dealer";
  } else {
    // Add the card to the dealer hand array
    dealer.hand.push(dealtCard);
    dealer.updateHandTotal();
    // Display nothing for dealer hend total when new hand is dealt
    if (newDeal) {
      alert("New deal!");
      document.getElementById("dealerheader").innerHTML = "";
    } else {
      // No longer a newly dealt hand, display dealer hand total
      if (dealer.aceInHand) {
        document.getElementById("dealerheader").innerHTML = dealer.handTotal.toString() + " or " + (dealer.handTotal + 10).toString();
      } else {
        document.getElementById("dealerheader").innerHTML = dealer.handTotal.toString();
      }
    }       
    turn = "player";
  }
  // Update the card display on the page
  displayCards();
}


// lays out all the dealt cards on the page
function displayCards() {
  // dealer cards
  if (newDeal) {
    var cardHTML = "";
    cardHTML += "<img src='" + gameDeck.cardPath + cardBack + "'>";
    for (var i = 1; i < dealer.hand.length; i++) {
      cardHTML += "<img src='" + gameDeck.cardPath + dealer.hand[i] + "'>";
    }
    document.getElementById("dealerheader").innerHTML = "";
    document.getElementById("dealer").style.width = (i * 100) + "px";
    document.getElementById("dealer").innerHTML = cardHTML;
  } else {
    var cardHTML = "";
    for (var i = 0; i < dealer.hand.length; i++) {
      cardHTML += "<img src='" + gameDeck.cardPath + dealer.hand[i] + "'>";
    }
    document.getElementById("dealer").style.width = (i * 100) + "px";
    document.getElementById("dealer").innerHTML = cardHTML;
  }
  // player cards
  var cardHTML = "";
  for (var i = 0; i < player.hand.length; i++) {
    cardHTML += "<img src='" + gameDeck.cardPath + player.hand[i] + "'>";
  }
  document.getElementById("player").style.width = (i * 100) + "px";
  document.getElementById("player").innerHTML = cardHTML;
}