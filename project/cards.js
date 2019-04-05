// The card arrays

var cards = ["images/cards/AC.png",
"images/cards/2C.png",
"images/cards/3C.png",
"images/cards/4C.png",
"images/cards/5C.png",
"images/cards/6C.png",
"images/cards/7C.png",
"images/cards/8C.png",
"images/cards/9C.png",
"images/cards/10C.png",
"images/cards/JC.png",
"images/cards/QC.png",
"images/cards/KC.png",
"images/cards/AD.png",
"images/cards/2D.png",
"images/cards/3D.png",
"images/cards/4D.png",
"images/cards/5D.png",
"images/cards/6D.png",
"images/cards/7D.png",
"images/cards/8D.png",
"images/cards/9D.png",
"images/cards/10D.png",
"images/cards/JD.png",
"images/cards/QD.png",
"images/cards/KD.png",
"images/cards/AH.png",
"images/cards/2H.png",
"images/cards/3H.png",
"images/cards/4H.png",
"images/cards/5H.png",
"images/cards/6H.png",
"images/cards/7H.png",
"images/cards/8H.png",
"images/cards/9H.png",
"images/cards/10H.png",
"images/cards/JH.png",
"images/cards/QH.png",
"images/cards/KH.png",
"images/cards/AS.png",
"images/cards/2S.png",
"images/cards/3S.png",
"images/cards/4S.png",
"images/cards/5S.png",
"images/cards/6S.png",
"images/cards/7S.png",
"images/cards/8S.png",
"images/cards/9S.png",
"images/cards/10S.png",
"images/cards/JS.png",
"images/cards/QS.png",
"images/cards/KS.png"]

var usedCards = new Array(52);
var drawnCards = 0;

function getRandomUnusedCard() {
  if (drawnCards == 52) {
    alert("No more cards in deck.");
    return;
  }
  var getCard = Math.floor(Math.random() * 52)
  if (usedCards[getCard] == "drawn") {
    getRandomUnusedCard();
  }
  else {
    usedCards[getCard] = "drawn";
    drawnCards ++;
    document.getElementById("card").src = cards[getCard];
    document.getElementById("cardsused").innerHTML = drawnCards;
    // return cards[getCard];
  }
}
