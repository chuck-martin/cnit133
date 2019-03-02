/*
Chuck Martin
CNIT 133 Lab 5
Adding a rotationg ad banner to the bingo game
February 26, 2018
*/

// When the page finished loading, run the function to load the first ad.
// window.onload = cm_choosePic;

// var theAd = 0;
// var adImages = new Array("images/reading1.gif","images/reading2.gif","images/reading3.gif");

function cm_choosePic() {
	// Don't need this first line anymore.
	// theAd = Math.floor(Math.random() * adImages.length);
	// Changing this to assemble the ad to display.
	document.getElementById("adBanner").src = "images/banner" + pickImageNumber() + ".gif";

	cm_rotate();
}

function cm_chooseVerticalPic() {
	document.getElementById("vAdBanner").src = "images/vbanner" + pickVerticalImageNumber() + ".jpg";

	cm_verticalRotate();
}

function cm_rotate() {
	// Don't need this part anymore either.
	/* theAd++;
	if (theAd == adImages.length) {
		theAd = 0;
	} */
	// document.getElementById("adBanner").src = adImages[theAd];
	document.getElementById("adBanner").src = "images/banner" + pickImageNumber() + ".gif";

	window.setTimeout(cm_rotate, displayTime() * 1000);
}

function cm_verticalRotate() {
	document.getElementById("vAdBanner").src = "images/vbanner" + pickVerticalImageNumber() + ".jpg";

	window.setTimeout(cm_verticalRotate, displayTimeVertical() * 1000);
}

// Picks a random number for the images
function pickImageNumber() {
	// There are currently 3 images.
	return Math.ceil(Math.random() * 3);
}

function pickVerticalImageNumber() {
	// There are currently 5 vertical images.
	return Math.ceil(Math.random() * 5);
}

// Selects a random ad duration
function displayTime() {
	// Duration between 5 and 10 seconds.
	return Math.ceil(Math.random() * 5) + 5;
}

function displayTimeVertical() {
	// Duration between 10 and 15 seconds.
	return Math.ceil(Math.random() * 5) + 10;
}
