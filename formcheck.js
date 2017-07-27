var prenom = document.getElementById('prenom');
var nom = document.getElementById('nom');
var mail = document.getElementById('mail');
var message = document.getElementById('message');

prenom.addEventListener("input", function(element) {
	if(prenom.value.length == 0) {
		prenom.style.border = "1px solid #ff0000";
	} else {
		prenom.style.border = "1px solid #00FF00";
	}
});

nom.addEventListener("input", function(element) {
	if(nom.value.length == 0) {
		nom.style.border = "1px solid #ff0000";
	} else {
		nom.style.border = "1px solid #00FF00";
	}
});

mail.addEventListener("input", function(element) {
	if(!RegExp(/^(\w|\w.\w)+@(\w)+\.(\w){2,4}$/).test(mail.value)) {
		mail.style.border = "1px solid #ff0000";
	} else {
		mail.style.border = "1px solid #00FF00";
	}
});

message.addEventListener("input", function(element) {
	if(message.value.length == 0) {
		message.style.border = "1px solid #ff0000";
	} else {
		message.style.border = "1px solid #00FF00";
	}
});