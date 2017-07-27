var submit = document.getElementById("button-submit");
var errors = document.getElementById("errors");
submit.addEventListener("click", function(element) {
    element.preventDefault();
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function()
    {
        if (xhr2.readyState === XMLHttpRequest.DONE) {
            if (xhr2.status === 200) {
                var rep = JSON.parse(xhr2.responseText);
                var keys = Object.entries(rep);
                var str = "";
                errors.style.color = "#FF0000";
                keys.forEach(function(element, index) {
                    if(element[0] === "success") errors.style.color = "#00FF00";
                    str += element[1] + "<br>";
                });
                errors.innerHTML = str;
            }
        }
    }
    xhr2.open("POST", 'processing.php', true);
    xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr2.send("prenom=" + document.getElementById("prenom").value + "&nom=" + document.getElementById("nom").value + "&e-mail=" + document.getElementById("mail").value + "&message=" + document.getElementById("message").value + "&g-recaptcha-response=" + document.getElementById("g-recaptcha-response").value);
});
document.getElementById("prenom").value = "blablabla";
document.getElementById("nom").value = "blablablaa";
document.getElementById("mail").value = "blablablaaaa@hotmail.com";
document.getElementById("message").value = "blablablaaaaa";