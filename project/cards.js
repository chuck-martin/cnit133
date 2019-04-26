var drawnNumbers = "";

// The deck of cards object

class DeckOfCards {
  constructor(
    deck = new Array("AC.png", "2C.png", "3C.png", "4C.png", "5C.png", "6C.png",
    "7C.png", "8C.png", "9C.png", "TC.png", "JC.png", "QC.png", "KC.png",
    "AD.png", "2D.png", "3D.png", "4D.png", "5D.png", "6D.png",
    "7D.png", "8D.png", "9D.png", "TD.png", "JD.png", "QD.png", "KD.png",
    "AH.png", "2H.png", "3H.png", "4H.png", "5H.png", "6H.png",
    "7H.png", "8H.png", "9H.png", "TH.png", "JH.png", "QH.png", "KH.png",
    "AS.png", "2S.png", "3S.png", "4S.png", "5S.png", "6S.png",
    "7S.png", "8S.png", "9S.png", "TS.png", "JS.png", "QS.png", "KS.png"),
    usedCards = new Array(52),
    drawnCards = 0,
    cardPath = "images/cards/")
    {
      this.deck = deck;
      this.usedCards = usedCards;
      this.drawnCards = drawnCards;
      this.cardPath = cardPath;
    }

  // Gets a random card from a deck of cards
  // Sets a drawn card to "drawn" in a parallel array so it cannot be drawn again
  getRandomUnusedCard() {
    var getCard = Math.floor(Math.random() * this.deck.length);
    // drawnNumbers += ", " + getCard.toString();
    // alert(drawnNumbers);
    // is the card still there?
    while (this.deck[getCard] == "") {
      // Nope, draw again
       // this.getRandomUnusedCard();
       var getCard = Math.floor(Math.random() * this.deck.length);
    }
    // else {
      // card is still in the deck
      var card = this.deck[getCard];
      this.usedCards[getCard] = "";
      // this.drawnCards ++;
      return card;
    // }
  }

}

/*
var cardPath = "images/cards/";
var cards = ["AC.png", "2C.png", "3C.png", "4C.png", "5C.png", "6C.png",
"7C.png", "8C.png", "9C.png", "TC.png", "JC.png", "QC.png", "KC.png",
"AD.png", "2D.png", "3D.png", "4D.png", "5D.png", "6D.png",
"7D.png", "8D.png", "9D.png", "TD.png", "JD.png", "QD.png", "KD.png",
"AH.png", "2H.png", "3H.png", "4H.png", "5H.png", "6H.png",
"7H.png", "8H.png", "9H.png", "TH.png", "JH.png", "QH.png", "KH.png",
"AS.png", "2S.png", "3S.png", "4S.png", "5S.png", "6S.png",
"7S.png", "8S.png", "9S.png", "TS.png", "JS.png", "QS.png", "KS.png"]
var usedCards = new Array(52);
var drawnCards = 0;


window.onload = clearCards;

function clearCards() {
  for (i=1; i < 6; i++) {
    document.getElementById("dcard" + i).src = "";
  }
  document.getElementById("drawnCard").src = "";
  drawnCards = 0;
  var usedCards = new Array(52);
  // empties existing arrays
  dCards.length = 0;
  pCards.length = 0;
}



// Gets a random card from a deck of cards
// Sets a drawn card to "drawn" in a parallel array so it cannot be drawn again
function getRandomUnusedCard() {
  var getCard;
  if (this.drawnCards == 52) {
    alert("No more cards in deck.");
    return;
  }
  getCard = Math.floor(Math.random() * this.deck.length)
  if (this.usedCards[getCard] == "drawn") {
    getRandomUnusedCard();
  }
  else {
    this.usedCards[getCard] = "drawn";
    this.drawnCards ++;
    return this.deck[getCard];
  }
}


function dealCard() {
  var getCard = Math.floor(Math.random() * cards.length)
  if (usedCards[getCard] == "drawn") {
    getRandomUnusedCard();
  }
  else {
    alert(cards[getCard]);
    usedCards[getCard] = "drawn";
    drawnCards ++;
    document.getElementById("drawnCard").src = cardPath + cards[getCard];
    if (dCards.length < 5) {
      if (turn = "player") {
        pCards[pCards.length] = cards[getCard];
        alert(pCards.length + ", " + pCards[pCards.length]);
        turn = "dealer";
      } else {
        alert("Dealer's turn.");
        dCards[dCards.length] = cards[getCard];
        turn = "player";
      }
    } else {
      alert("No more cards.");
    }
    for (i=1; i < dCards.length + 1; i++) {
      document.getElementById("pcard" + i).src = cardPath + pCards[i - 1];
      document.getElementById("dcard" + i).src = cardPath + dCards[i - 1];
    }
    // var cardCode = "<img src='" + cardPath + cards[getCard] + "' width='100px'>";
    // var cardNumber = "dealercard" + drawnCards;
    // document.getElementById(cardNumber).contentWindow.document.body.innerHTML = cardCode;
  }
}
*/