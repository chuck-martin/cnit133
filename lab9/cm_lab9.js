/*
Chuck Martin
CNIT 133 Lab 9
April 10, 2019
*/

// Validation via regualr exprssions
window.onload = initForm;

// Sets up listeners, event handlers
function initForm() {
	clearFields();
	document.forms[0].onsubmit = validForm;
  // Sets up a funciton to be run every time a field loses focus
  formElements = document.forms[0].getElementsByTagName("*");
  for (var i=0; i<formElements.length; i++) {
		if (formElements[i].id == "emailAddr" || "webSite" || "zip" ) {
      formElements[i].onblur = validateField;
    }
  }

}

// this run when Submit is clicked; it validates all fields
function validForm() {
	formElements = document.forms[0].getElementsByTagName("*");
	for (var i=0; i<formElements.length; i++) {
		if (formElements[i].id == "emailAddr" || "webSite" || "zip" ) {
			validateField();
		}
	}

}

function validateField() {
	switch(this.id) {
		case "emailAddr":
			// Email RegEx from book, as backup
			var emailre = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			// RegEx from https://www.regular-expressions.info/email.html
			// var emailre = /^\A[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z$/;
			if (!emailre.test(this.value)) {
				this.className += " " + "invalid";
			}
			else {
				this.className = removeInvalidClass(this.className);
			}
			break;
		case "webSite":
			// RegEx from http://urlregex.com/
			var urlre = "/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/";
			if (!urlre.test(this.value)) {
				this.className += " " + "invalid";
			}
			else {
				this.className = removeInvalidClass(this.className);
			}
			break;
		case "zip":
			if (!isZip(this.value)) {
				this.className += " invalid";
			}
			else {
				this.className = removeInvalidClass(this.className);
			}
			break;
		default:
			break;
	}
}



// Takes a string and returns if it is a ZIP code
// A ZIP code is exactly 5 digits
function isZip(testString) {
	var zipre = /^[0-9]{5}$/;
	return zipre.test(parseInt(testString));
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

function clearFields() {
	formElements = document.forms[0].getElementsByTagName("*");
  for (var i=0; i<formElements.length; i++) {
		if (formElements[i].id == "emailAddr" || "webSite" || "zip" ) {
			// Clear the fields
      formElements[i].value = "";
			// Remove the "invalid" from any classes
			formElements[i].className = removeInvalidClass(formElements[i].className);
    }
  }
}
