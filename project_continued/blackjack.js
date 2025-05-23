/* Class project
Chuck Martin
CNIT 133
Spring 2019 */

// This is the code for a blackjack game

window.onload = startGame;

// Set up initial variables
/*
var turn = "player";
var game;
var player;
var dealer;
var gameDeck;
var cardBack;
var newDeal = true;
var playerDollars = 0;
var betAmount = 0;
var doubleDown = false;
*/

// Class for game: values and other stuff
// New game object should be instantiated every time the page loads
class BlackjackGame {
  constructor(
    turn = "player",
    playerHand,
    playerSplitHand,
    dealerHand,
    gameDeck,
    cardBack,
    newDeal = true,
    playerDollars = 0,
    betAmount = 0,
    cardsDealt = 0)
  {
    this.turn = turn;
    this.playerHand = playerHand;
    this.playerSplitHand = playerSplitHand;
    this.dealerHand = dealerHand;
    this.gameDeck = gameDeck;
    this.cardBack = cardBack;
    this.newDeal = newDeal;
    this.playerDollars = playerDollars;
    this.betAmount = betAmount;
    this.cardsDealt = cardsDealt;
  }
}

// Class for blackjack hands
class BlackjackHand {
  constructor(
    hand = new Array(),
    cards = new Array(),
    handTotal =  0,
    aceInHand = false,
    dealerShowsAce = false,
    sameCardRank = false,
    doubleDown = false,
    split = false)
    {
      this.hand = hand;
      this.cards = cards;
      this.handTotal = handTotal;
      this.aceInHand = aceInHand;
      this.dealerShowsAce = dealerShowsAce;
      this.sameCardRank = sameCardRank;
      this.doubleDown = doubleDown;
      this.split = split;
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

// Runs when page loads
function startGame() {
  // Instantiate game object
  game = new BlackjackGame;
  // Set up money amounts
  document.getElementById("addfundsamount").value = 0;
  document.getElementById("playermoney").innerHTML = "0";
  document.getElementById("betamount").value = game.betAmount;
  document.getElementById("winner").innerHTML = "";
  // Disable buttons until the game is set up
  document.getElementById("playerbetbutton").disabled = true;
  document.getElementById("hitme").disabled = true;
  document.getElementById("stand").disabled = true;
  // Ask player how much they want to play, put that number in the field
  // getBankroll();
  //document.getElementById("playermoney").innerHTML = "$" + playerDollars;
  // instantiate new deck of cards
  game.gameDeck = new DeckOfCards;
  // Initialize card deck, deck count
  game.cardBack = game.gameDeck.cardBacks[Math.floor(Math.random() * game.gameDeck.cardBacks.length)];
  document.getElementById("deck").src = game.gameDeck.cardPath + game.cardBack;
  document.getElementById("cardcount").innerHTML = game.gameDeck.deck.size;
  // Allows bet button to be enabled after player enters a bet amount
  document.getElementById("betamount").addEventListener("input", function(){
    document.getElementById("playerbetbutton").disabled = false;
  }); 

  document.getElementById("totalcards").value = game.cardsDealt;
}

// Gets starting amount of money
function getBankroll() {
  var tryNumber = prompt("How much would you like to play?\nEnter 0 to quit.");
  if (tryNumber == null) {
    // User pressed Cancel
    return null;
  } else {
    while (isNaN(tryNumber)) {
      tryNumber = prompt("How much would you like to play?\nEnter 0 to quit.\nEnter numbers only!");
    }
    game.playerDollars = parseInt(tryNumber);
  }
}

// Add funds to bankroll
function addFunds() {
  var currentfunds = parseInt(document.getElementById("playermoney").innerHTML);
  var newmoney = parseInt(document.getElementById("addfundsamount").value);
  game.playerDollars = currentfunds + newmoney;
  document.getElementById("playermoney").innerHTML = game.playerDollars;
  document.getElementById("addfundsamount").value = 0;
}

function newGame() {
  // Get bet amount
  game.betAmount = parseInt(document.getElementById("betamount").value);
  if (parseInt(game.betAmount) == NaN) {
    alert("No number entered.");
    return;
  } else if (parseInt(game.betAmount) < 0 || parseInt(game.betAmount) > game.playerDollars) {
    alert("Invalid amount entered");
    return;
  } else  if (parseInt(game.betAmount) == 0) {
    alert("Thanks for playing!");
    return;
  } else {
      game.playerDollars -= parseInt(game.betAmount);
      document.getElementById("playermoney").innerHTML = "$" + game.playerDollars;
      document.getElementById("winner").innerHTML = "";
  }
  // If more than 30 cards used, create a fresh deck
  if (game.gameDeck.deck.size < 20) {
    game.gameDeck = new DeckOfCards;
    game.cardBack = game.gameDeck.cardBacks[Math.floor(Math.random() * game.gameDeck.cardBacks.length)];
    document.getElementById("cardcount").innerHTML = game.gameDeck.deck.size;
  }
  // create player & dealer instances 
  game.playerHand = new BlackjackHand;
  game.dealerHand = new BlackjackHand;
  // Clear the necessary fields
  document.getElementById("deck").src = game.gameDeck.cardPath + game.cardBack;
  document.getElementById("dealer").innerHTML = "";
  document.getElementById("dealer").style.width = "0px";
  document.getElementById("dealerheader").style.visibility = "hidden";
  document.getElementById("player").innerHTML = "";
  document.getElementById("player").style.width = "0px";
  document.getElementById("playermoney").innerHTML = "$" + game.playerDollars;
  initialDeal();
}

// Deal 4 cards, 2 each
function initialDeal() {
  document.getElementById("doubledownbutton").style.visibility = "hidden";
  document.getElementById("splitpair").style.visibility = "hidden";
  // Deal 4 cards, 2 each
  for (var i = 0; i < 4; i++) {
    if (game.turn == "player") {
      dealPlayerCard();
      game.turn = "dealer";
    } else {
      dealDealerCard();
      game.turn = "player";
    }
  }

  // Is the dealer's up card an ace (used for insurance)
  if (game.dealerHand.hand[1].charAt(0) == "A") {
    game.dealerHand.dealerShowsAce = true;
  }

  // Test for blackjacks
  // If player gets blackjack, player wins, game over, start new game
  if (isBlackJack(game.playerHand)) {
    document.getElementById("winner").innerHTML = "Blackjack! You win!";
    // alert("You win!");
    game.playerDollars += game.betAmount * 2.5;
    document.getElementById("playermoney").innerHTML = "$" + game.playerDollars;
    showAllDealerCards();
    return null;
    // Player doesn't have blackjack, but if dealer gets blackjack, dealer wins, game over, start new game
  } else if (isBlackJack(game.dealerHand)) {
    showAllDealerCards();
    document.getElementById("winner").innerHTML = "Blackjack! Dealer wins!";
    return null;
    // alert("Dealer wins!");
    // playerDollars -= betAmount;
    // document.getElementById("playermoney").innerHTML = "$" + playerDollars.toString();
  }

  document.getElementById("hitme").disabled = false;
  document.getElementById("stand").disabled = false;

  // Test for player eligible to double down
  if (game.playerHand.handTotal == 10 || game.playerHand.handTotal == 11) {
    document.getElementById("doubledownbutton").style.visibility = "visible";
  }

  // Test for player eligibility to split a pair
  if (game.playerHand.hand[0].charAt(0) == game.playerHand.hand[1].charAt(0)) {
    document.getElementById("splitpair").style.visibility = "visible";
  }

  // insurance();
}

function dealPlayer() {
  // Deals one or two hands depending on the value of split: false = 1 & true = 2

}

function dealPlayerCard() {
  // Add the card to the player hand array
  game.playerHand.hand.push(game.gameDeck.getRandomUnusedCard());
  // Update the data at the bottom
  updateCardCount(game.playerHand.hand[game.playerHand.hand.length - 1]);
  //Updte the deck size
  document.getElementById("cardcount").innerHTML = game.gameDeck.deck.size;
  // add the HTML necesary to display the card to the cards array
  game.playerHand.cards.push("<img src='" + game.gameDeck.cardPath + game.playerHand.hand[game.playerHand.hand.length - 1] + "'>");
  game.playerHand.updateHandTotal();
  if (game.playerHand.aceInHand) {
    document.getElementById("playerheader").innerHTML = game.playerHand.handTotal.toString() + " or " + (game.playerHand.handTotal + 10).toString();
  } else {
    document.getElementById("playerheader").innerHTML = game.playerHand.handTotal.toString();
  }
  // Update the display of player cards
  document.getElementById("player").style.width = (game.playerHand.hand.length * 100) + "px";
  document.getElementById("player").classList.add("activeHand")
  document.getElementById("player").innerHTML += game.playerHand.cards[game.playerHand.cards.length - 1];
  if (game.playerHand.handTotal > 21) {
    document.getElementById("dealerheader").style.visibility = "visible";
    showAllDealerCards();
    document.getElementById("winner").innerHTML = "Dealer wins!";
    return null;
    // alert("Dealer wins!");
    // No need to update player money; it was already taken when it was bet
  }
}

function dealDealerCard() {
  // Add the card to the dealer hand array
  game.dealerHand.hand.push(game.gameDeck.getRandomUnusedCard());
  // Update the data at the bottom
  updateCardCount(game.dealerHand.hand[game.dealerHand.hand.length - 1]);
  document.getElementById("cardcount").innerHTML = game.gameDeck.deck.size;
  // add the HTML necesary to display the card to the cards array
  if (game.dealerHand.hand.length == 1) {
    game.dealerHand.cards.push("<img src='" + game.gameDeck.cardPath + game.cardBack + "'>");
  } else {
    game.dealerHand.cards.push("<img src='" + game.gameDeck.cardPath + game.dealerHand.hand[game.dealerHand.hand.length - 1] + "'>");
  }
  game.dealerHand.updateHandTotal();
  if (game.dealerHand.aceInHand) {
    document.getElementById("dealerheader").innerHTML = game.dealerHand.handTotal.toString() + " or " + (game.dealerHand.handTotal + 10).toString();
  } else {
    document.getElementById("dealerheader").innerHTML = game.dealerHand.handTotal.toString();
  }
  // Update the display of dealer cards
  if (game.dealerHand.cards.length < 3) {
    // On the initial deal, deal the first card as a card back
    document.getElementById("dealer").style.width = (game.dealerHand.hand.length * 100) + "px";
    document.getElementById("dealer").innerHTML += game.dealerHand.cards[game.dealerHand.cards.length - 1];
  } else {
    showAllDealerCards();
  }
}

// If we get here, player has 21 or less
function dealDealerCards() {
  document.getElementById("hitme").disabled = true;
  document.getElementById("stand").disabled = true;
  // If player has ace, calculate correct hand total
  if (game.playerHand.aceInHand && game.playerHand.handTotal <= 11) {
      game.playerHand.handTotal += 10;
  }
  document.getElementById("playerheader").innerHTML = (game.playerHand.handTotal).toString();
  newDeal = false;

  // document.getElementById("dealerheader").innerHTML = (dealer.handTotal).toString();
  document.getElementById("dealerheader").style.visibility = "visible";
  showAllDealerCards();
  while (!stopDealing()) {
    // sleep(500);
    dealDealerCard();
  }
  // If soft 17 to 21, make hand total correct
  if (game.dealerHand.aceInHand && game.dealerHand.handTotal >= 7 && game.dealerHand.handTotal <= 11) {
    game.dealerHand.handTotal += 10;
    document.getElementById("dealerheader").innerHTML = game.dealerHand.handTotal.toString();
  } else if (game.dealerHand.aceInHand && game.dealerHand.handTotal > 21) {
    document.getElementById("dealerheader").innerHTML = game.dealerHand.handTotal.toString();
  }

  declareWinner();
}

// Used to determine when to stop adding to dealer hand
// With or without an ace, dealer stands on 17-21
function stopDealing() {
  // Dealer has 17 or better
  if (game.dealerHand.handTotal >= 17) {
    return true;
  // Soft 17 to soft 21
  } else if (game.dealerHand.aceInHand && game.dealerHand.handTotal >= 7 && game.dealerHand.handTotal <= 11) {
    return true;
  // All other hands, deal another card
  } else {
    return false;
  }
}

function showAllDealerCards() {
  game.dealerHand.cards[0] = "<img src='" + game.gameDeck.cardPath + game.dealerHand.hand[0] + "'>";
  document.getElementById("dealer").style.width = (game.dealerHand.hand.length * 100) + "px";
  var tempHTML = "";
  for (var i = 0; i < game.dealerHand.cards.length; i++) {
    tempHTML += game.dealerHand.cards[i];
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
    document.getElementById("hitme").disabled = true;
    document.getElementById("stand").disabled = true;
    return true;
  } else {
    return false;
  }
}

function noSplit() {
  document.getElementById("splitpair").style.visibility = "hidden";
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

// Can double down when player total is 10 or 11
function playerDoubleDown() {
  document.getElementById("doubledownbutton").style.visibility = "hidden";
  document.getElementById("hitme").disabled = true;
  document.getElementById("stand").disabled = true;
  game.playerHand.doubleDown = true;
  // double bet amount
  doubleBet();
  // deal 1 player card, then deal dealer cards
  dealPlayerCard();
  dealDealerCards();
}

// Can split when both dealt cards are same value. Doubles bet (one bet on each hand). This game allows one split per hand.
function playerSplitPair() {
  // Requires the dealing and evaluation of 2 player hands befoer the delaer hand is dealt, player can win on 0, 1, or 2 hands
  document.getElementById("splitpair").style.visibility = "hidden";
  game.playerHand.split = true;
  game.playerSplitHand = new BlackjackHand;

}

// Doubles the player bet. Used for doubleing down and splitting pairs. 
function doubleBet() {
  game.playerDollars -= game.betAmount;
  document.getElementById("playermoney").innerHTML = "$" + game.playerDollars;
  game.betAmount += game.betAmount;
  document.getElementById("betamount").value = game.betAmount;
}

function declareWinner() {
  if (((game.playerHand.handTotal > game.dealerHand.handTotal) && game.playerHand.handTotal <= 21) || game.dealerHand.handTotal > 21) {
    document.getElementById("winner").innerHTML = "You win!";
    game.playerDollars +=  game.betAmount * 2;
    document.getElementById("playermoney").innerHTML = "$" + game.playerDollars;
    showAllDealerCards();
  } else if ((game.dealerHand.handTotal > game.playerHand.handTotal) && game.dealerHand.handTotal <= 21) {
    document.getElementById("winner").innerHTML = "Dealer wins!";
    // No need to update player amount; it was already taken when it was bet
  } else {
    // alert("Push!");
    document.getElementById("winner").innerHTML = "Push!";
    game.playerDollars += game.betAmount;
    document.getElementById("playermoney").innerHTML = "$" + game.playerDollars;
    showAllDealerCards();
  }
  if (game.playerHand.doubleDown) {
    document.getElementById("betamount").value = (game.betAmount / 2);
  }
}

// Updates the card count table
function updateCardCount(card) {
  // Update the number of cards
  document.getElementById("totalcards").value = ++game.cardsDealt;
  // Get the value of the card
  var thecard = card.charAt(0) + card.charAt(1);
  // Get the current value of the card
  var count = parseInt(document.getElementById(thecard).innerHTML);
  // Increment the count
  count++;
  // Assign the updated count to the correct cell
  document.getElementById(thecard).innerHTML = count;
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