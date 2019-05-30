/* Final exam
Chuck Martin
CNIT 133
Spring 2019 */

// This is the code to deal hands of cards

// Global variables (sorry)
var gamesPlayed;
var cardCounts = new Array(52);

window.onload = newGame;

// Class for blackjack hands
class Hand {
  constructor(
    cards = new Array(),
    cardImages = new Array()
  )
    {
      this.cards = cards;
      this.cardImages = cardImages;
    }

  
}

function newGame() {
  // instantiate new deck of cards
  gameDeck = new DeckOfCards;
  // Initialize card deck, deck count
  cardBack = gameDeck.cardBacks[Math.floor(Math.random() * gameDeck.cardBacks.length)];
  document.getElementById("cardcount").innerHTML = 52;
  // create player & dealer instances 
  player = new Hand;
  // Clear the necessary fields
  document.getElementById("deck").src = gameDeck.cardPath + cardBack;
  // Get/set last values of cards in hand
  if (document.getElementById("five").checked == true) {
    document.getElementById("five").checked = true;
  }
  if (document.getElementById("seven").checked == true) {
    document.getElementById("seven").checked = true;
  }
  // Set up UI elements
  document.getElementById("player").innerHTML = "";
  document.getElementById("player").style.width = "0px";
  document.getElementById("hitme").disabled = false;
  document.getElementById("playerbetbutton").disabled = true;
  // If player has not played before, set to 0
  if (isNaN(parseInt(document.getElementById("timesplayed").value)) || document.getElementById("timesplayed").value == undefined) {
    gamesPlayed = 0;
  }
  document.getElementById("timesplayed").value = gamesPlayed;
}



function dealPlayerCard() {
  // Add the card to the player hand array
  player.cards.push(gameDeck.getRandomUnusedCard());
  gameDeck.drawnCards++;
  document.getElementById("cardcount").innerHTML = 52 - gameDeck.drawnCards;
  updateCardCount(player.cards[player.cards.length - 1]);
  // add the HTML necesary to display the card to the cards array
  player.cardImages.push("<img src='" + gameDeck.cardPath + player.cards[player.cards.length - 1] + "'>");
  // Update the display of player cards
  document.getElementById("player").style.width = (player.cards.length * 100) + "px";
  document.getElementById("player").innerHTML += player.cardImages[player.cardImages.length - 1];
  // check for hand size, change buttun states when hand is complete
  if (document.getElementById("five").checked == true && player.cards.length == 5) {
    // alert("Five selected");
    document.getElementById("hitme").disabled = true;
    document.getElementById("playerbetbutton").disabled = false;
    gamesPlayed++;
    return null;
  }
  if (document.getElementById("seven").checked == true && player.cards.length == 7) {
    document.getElementById("hitme").disabled = true;
    document.getElementById("playerbetbutton").disabled = false;
    gamesPlayed++;
    return null;
  }

}

// Updates the card count table
function updateCardCount(card) {
  // Get the value of the card
  var thecard = card.charAt(0) + card.charAt(1);
  // Get the current value of the card
  var count = parseInt(document.getElementById(thecard).innerHTML);
  // Increment the count
  count++;
  // Assign the updated count to the correct cell
  document.getElementById(thecard).innerHTML = count;
}