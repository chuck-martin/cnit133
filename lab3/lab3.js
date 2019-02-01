window.onload = initAll;

// Variables for character Quotes
cm_gandalf="All we have to decide is what to do with the time that is given to us."
cm_gimli="Nobody tosses a Dwarf!"
cm_galadriel=" Even the smallest person can change the course of the future."
cm_boromir=" One does not simply walk into Mordor."
cm_gollum="It came to me. It's mine, my own, my love, my precious."
cm_aragorn="I see in your eyes the same fear that would take the heart of me. A day may come when the courage of men fails, when we forsake our friends and break all bonds of fellowship, but it is not this day. An hour of wolves and shattered shields, when the age of men comes crashing down! But it is not this day! This day we fight!"

// Event handler to call the saySomething function and pass it the ID of the clicked button.
function initAll() {
	document.getElementById("gandalf").onclick = saySomething;
	document.getElementById("gimli").onclick = saySomething;
	document.getElementById("galadriel").onclick = saySomething;
	document.getElementById("boromir").onclick = saySomething;
	document.getElementById("gollum").onclick = saySomething;
	document.getElementById("aragorn").onclick = saySomething;
}

// Takes the value of the clicked button's ID and displayes an alert box with a quote value.
function saySomething() {
	switch(this.id) {
		case "gandalf":
			alert(cm_gandalf);
			break;
		case "gimli":
			alert(cm_gimli);
			break;
		case "galadriel":
			alert(cm_galadriel);
			break;
		case "boromir":
			alert(cm_boromir);
			break;
		case "gollum":
			alert(cm_gollum);
			break;
		case "aragorn":
			alert(cm_aragorn);
			break;
		default:
	}
}
