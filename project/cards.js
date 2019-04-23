// The card arrays

var cardPath = "images/cards/";
var cards = ["AC.png", "2C.png", "3C.png", "4C.png", "5C.png", "6C.png",
"7C.png", "8C.png", "9C.png", "TC.png", "JC.png", "QC.png", "KC.png",
"AD.png", "2D.png", "3D.png", "4D.png", "5D.png", "6D.png",
"7D.png", "8D.png", "9D.png", "TD.png", "JD.png", "QD.png", "KD.png",
"AH.png", "2H.png", "3H.png", "4H.png", "5H.png", "6H.png",
"7H.png", "8H.png", "9H.png", "TH.png", "JH.png", "QH.png", "KH.png",
"AS.png", "2S.png", "3S.png", "4S.png", "5S.png", "6S.png",
"7S.png", "8S.png", "9S.png", "TS.png", "JS.png", "QS.png", "KS.png"]

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

var usedCards = new Array(52);
var dCards = new Array;
var pCards = new Array;
var drawnCards = 0;
var turn = "player";

function getRandomUnusedCard() {
  if (drawnCards == 52) {
    alert("No more cards in deck.");
    return;
  }
  var getCard = Math.floor(Math.random() * cards.length)
  if (usedCards[getCard] == "drawn") {
    getRandomUnusedCard();
  }
  else {
    usedCards[getCard] = "drawn";
    drawnCards ++;
    // document.getElementById("card").src = cardPath + cards[getCard];
    // document.getElementById("cardsused").innerHTML = drawnCards;
    return cards[getCard];
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
