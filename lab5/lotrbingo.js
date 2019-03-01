/*
Chuck Martin
CNIT 133, Lab 4
Lord of the Rings Bingo
This is adapted from the buzzword bingo app
*/

// This is an array containing Lord of the Rings character names.
var cm_characters = new Array (
	"Aragorn",
	"Arwen",
	"Barliman Butterbur",
	"Bilbo Baggins",
	"Boromir",
	"Celeborn",
	"Déagol",
	"Denethor",
	"Elrond",
	"Éomer",
	"Éothain",
	"Éowyn",
	"Faramir",
	"Farmer Maggott",
	"Frodo Baggins",
	"Galadriel",
	"Gamling",
	"Gandalf",
	"Gimli",
	"Glorfindel",
	"Gollum",
	"Gríma Wormtongue",
	"Grimbold",
	"Haldir of Lórien",
	"Háma",
	"Isildur",
	"Legolas",
	"Meriadoc Brandybuck",
	"Mouth of Sauron",
	"Nazgûl",
	"Peregrin Took",
	"Radagast",
	"Samwise Gamgee",
	"Saruman",
	"Sauron",
	"Shelob",
	"Théoden",
	"Théodred",
	"Tom Bombadil",
	"Treebeard",
	"Witch-king of Angmar"
);

// An empty array the length of the characters array used to track the ones used
var usedWords = new Array(cm_characters.length);

// Once the page loads, this calls the main method
window.onload = initAll;


// This calls the function that draws the initial card--if the browser supports JavaScript
function initAll() {
	// I'm assuming modern browser, so no conditional
	// if (document.getElementById) {
		// Set an event handler on the object with the ID "reload"
		document.getElementById("reload").onclick = anotherCard;
		// Call the function to create a card
		newCard();
	/*}
	else {
		alert("Sorry, your browser doesn't support this script");
	}
	*/
	// Put initial images in ad divs.
	document.getElementById("adBanner").src = "images/banner2.gif";
	document.getElementById("vAdBanner").src = "images/vbanner1.jpg";


	// call the functin to load the ads
	cm_choosePic();
}

// This is just a loop that calls the function to add content to the squares 25 times
function newCard() {
	for (var i=0; i<24; i++) {
		setSquare(i);
	}
}

/*
This function does 3 things:
- Gets a random value from the Array
- Checks to see if the value is unique
- Puts the unique value in the next square, clears the class, sets a listener
*/
function setSquare(thisSquare) {
	do {
		var randomWord = Math.floor(Math.random() * cm_characters.length);
	}
	while (usedWords[randomWord]);

	usedWords[randomWord] = true;
	var currSquare = "square" + thisSquare;
	document.getElementById(currSquare).innerHTML = cm_characters[randomWord];
	document.getElementById(currSquare).className = "";
	document.getElementById(currSquare).onmousedown = toggleColor;
}

// Clears the usedWords array, then creates a new card
function anotherCard() {
	for (var i=0; i<cm_characters.length; i++) {
		usedWords[i] = false;
	}

	newCard();
	return false;
}

// Toggles the current square's background, also checks if the toggled square ceates a winner
function toggleColor(evt) {
	// I really don't want to do this; I want to assume no one uses old IE
	if (evt) {
		var thisSquare = evt.target;
	}
	else {
		var thisSquare = window.event.srcElement;
	}
	if (thisSquare.className == "") {
		thisSquare.className = "pickedBG";
	}
	else {
		thisSquare.className = "";
	}
	checkWin();
}

// This is where all the magic happens
function checkWin() {
	var winningOption = -1;
	var setSquares = 0;
	var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);

	for (var i=0; i<24; i++) {
		var currSquare = "square" + i;
		if (document.getElementById(currSquare).className != "") {
			document.getElementById(currSquare).className = "pickedBG";
			setSquares = setSquares | Math.pow(2,i);
		}
	}

	for (var i=0; i<winners.length; i++) {
		if ((winners[i] & setSquares) == winners[i]) {
			winningOption = i;
		}
	}

	if (winningOption > -1) {
		for (var i=0; i<24; i++) {
			if (winners[winningOption] & Math.pow(2,i)) {
				currSquare = "square" + i;
				document.getElementById(currSquare).className = "winningBG";
			}
		}
	}
}
