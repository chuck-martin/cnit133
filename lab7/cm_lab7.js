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
}

function validateField() {
	switch(this.id) {
		case "emailAddr":
		case "color":
		case "sunroof":
		case "pWindows":
		case "twoDoor":
		case "fourDoor":
			alert(this.id);
			break;
		case "zip":
			if (!isZip(this.value)) {
				this.className += " invalid"
			}
			break;
		case "dealerList":
			alert(this.id);
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
