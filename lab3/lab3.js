window.onload = initAll;

// Variables for character Quotes
gandalf="All we have to decide is what to do with the time that is given to us."
gimli="Nobody tosses a Dwarf!"
galadriel=" Even the smallest person can change the course of the future."
boromir=" One does not simply walk into Mordor."
gollum="It came to me. It's mine, my own, my love, my precious."

function initAll() {
	document.getElementById("gandalf").onclick = saySomething;
	document.getElementById("gimli").onclick = saySomething;
	document.getElementById("galadriel").onclick = saySomething;
	document.getElementById("boromir").onclick = saySomething;
	document.getElementById("gollum").onclick = saySomething;
}

function saySomething() {
	switch(this.id) {
		case "gandalf":
			alert(gandalf);
			break;
		case "gimli":
			alert(gimli);
			break;
		case "galadriel":
			alert(galadriel);
			break;
		case "boromir":
			alert(boromir);
			break;
		case "gollum":
			alert(gollum);
			break;
		default:
	}
}
