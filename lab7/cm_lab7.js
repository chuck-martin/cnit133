/*
Chuck Martin
CNIT 133 Lab 7
March 19, 2019
*/

// Some alternate ways to do validation, based on existing example
// This calls the function to initialize the form objects when the page loads
window.onload = initForm;

// Sets up listeners, event handlers
function initForm() {
	document.forms[0].onsubmit = validForm;
	// document.getElementById("sunroof").onclick = doorSet;
  // Sets up a funciton to be run every time a field loses focus
  formElements = document.forms[0].getElementsByTagName("*");
  for (var i=0; i<formElements.length; i++) {
    // if (formElements[i].tagName == "SELECT" || formElements[i].tagName == "INPUT") {
		if ((formElements[i].id == "emailAddr" || "color" || "sunroof" || "pWindows" || "twoDoor" || "fourDoor" || "zip" || "dealerList")
		 		&& (formElements[i].tagName == "SELECT" || "INPUT")) {
      // alert("ID: " + formElements[i].id + ",\nTagName: " + formElements[i].tagName);
      formElements[i].onblur = validateField;
    }
  }

}

function validForm() {
  alert("Form submitted!");

	// Verify zip/dealerList
	verifyZipDealer();

}

function validateField() {
	switch(this.id) {
		case "emailAddr":
			break;
		case "color":
			if (this.selectedIndex == 0) {
				this.className += " invalid";
				alert(this.className);
				window.setTimeout(alert("No color selected!"), 2000);
			}
			else {
				alert("Color selected.");
				removeInvalidClass(this.className);
			}
			break;
		case "sunroof":
		case "pWindows":
		case "twoDoor":
		case "fourDoor":
			alert(this.id);
			break;
		case "zip":
			if (!isZip(this.value)) {
				this.className += " invalid";
				document.getElementById("ziperror").innerHTML = "ZIP must have 5 numbers.";
			}
			else {
				this.className = removeInvalidClass(this.className);
				document.getElementById("ziperror").innerHTML = "";
			}
			break;
		case "dealerList":
		if (document.getElementById("dealerList").selectedIndex == -1) {
			this.className += " invalid";
			document.getElementById("ziperror").innerHTML = "A dealer must be selected.";
		}
		else {
			this.className = removeInvalidClass(this.className);
			document.getElementById("ziperror").innerHTML = "";
		}
		break;
	}
}

function isColorPicked (colorpicker) {
	if (colorpicker.selectedIndex == 0) {
		colorpicker.className += " invalid";
		alert(colorpicker.className);
		window.setTimeout(alert("No color selected!"), 2000);
	}
	else {
		alert("Color selected.");
		removeInvalidClass(colorpicker.className);
	}
}

// Takes a string and returns if it is a ZIP code
// A ZIP code is exactly 5 digits
function isZip(testString) {
  // Is it an empty string?
  if (testString == "") {
    return false;
  }
  // Is it exactly 5 characters long?
  if (testString.length != 5) {
    return false;
  }
  return (isNum(testString));
}

// Tests if a string is numeric: contains only digits 0 through 9, inclusive
function isNum(passedVal) {
  if (passedVal == "") {
    return false;
  }
  // Tests if all characters are digits.
  for (var k=0; k<passedVal.length; k++) {
    if (passedVal.charAt(k) < "0") {
      return false;
    }
    if (passedVal.charAt(k) > "9") {
      return false;
    }
  }
  return true;
}

// Takes a strings of classes and removes "invalid" and returns the rest
function removeInvalidClass(classes) {
	var newClasses = "";
	var oldClasses = classes.split(" ");
	for (i=0; i < oldClasses.length; i++) {
		if (oldClasses[i].toLowerCase() != "invalid") {
			newClasses = newClasses + " " + oldClasses[i];
		}
	}
	return newClasses;
}

function verifyZipDealer() {
	if (document.getElementById("zip").value == "" && document.getElementById("dealerList").selectedIndex == -1) {
		document.getElementById("zip").className += " invalid";
		document.getElementById("dealerList").className += " invalid";
		document.getElementById("ziperror").innerHTML = "Either a ZIP must be entered or a dealer must be selected.";
		window.setTimeout(alert("They were empty"), 2000);
	}
}
