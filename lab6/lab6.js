/* Chuck Martin
CNIT 133 Lab 6
March 7, 2019
*/


window.onload = newWinLinks;

function newWinLinks() {
	// Loops through the DOM array of links
	for (var i=0; i<document.links.length; i++) {
		// If a link has a class of "newWin" assign it an event handler
		if (document.links[i].className == "newWin") {
			document.links[i].onclick = newWindow;
		}
	}
}

function newWindow() {
	// Create a variable for window parameters
	var windowparams = "width=350,height=260,left=" + cm_locationX() + ",top=" + cm_locationY();
	var catWindow = window.open(this.href,"catWin",windowparams);
	catWindow.focus();
	return false;
}

// These 2 functions determine a random location for the top-left corner of the window.
// returns a random horizontal location between 25 and 725
function cm_locationX () {
	return Math.floor(Math.random() * 700) + 25;
}

// returns a random vertical location between 25 and 525
function cm_locationY () {
	return Math.floor(Math.random() * 500) + 25;
}
