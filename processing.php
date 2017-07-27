<?php 
	if(empty($_POST)) echo "something went wrong.";
	$post = array($_POST['prenom'], $_POST['nom'], $_POST['e-mail'], $_POST['message'], $_POST['g-recaptcha-response']);

	$errors = []; // tableau contenant les erreurs du formulaire

	/* VERIFICATION DU CAPTCHA */
	$ch = curl_init("https://www.google.com/recaptcha/api/siteverify");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS, array("secret" => "6LdR4ykUAAAAAAQphAIXGAA_mYLgkw8YFqywkY09", "response" => $post[4]));
	$content = json_decode(curl_exec($ch), true);
	curl_close($ch);
	if(!$content["success"]) $errors['captcha'] = "Merci de vérifier le captcha.\n";
	/* VERIFICATION DES CHAMPS */
	if(empty($post[0])) $errors['prenom'] = "Le prénom entré est incorrect.\n";
	else $prenom = ucwords(htmlspecialchars($post[0]));

	if(empty($post[1])) $errors['nom'] = "Le nom entré est incorrect.\n";
	else $nom = ucwords(htmlspecialchars($post[1]));

	if(!preg_match("#^(\w|\w.\w)+@(\w)+\.(\w){2,4}$#", $post[2])) $errors['e-mail'] = "Le mail entré est incorrect.\n";
	else $mail = htmlspecialchars($post[2]);

	if(empty($post[3])) $errors['nom'] = "Le message entré est incorrect.\n";
	else $message = ucwords(htmlspecialchars($post[3]));

	
	if(empty($errors)) {
		$header = "Content-type: text/html; charset=utf-8 \r\n";
	    $header .= "From: Portfolio <contact@localhost.com> \r\n";
	    $header .= "MIME-Version: 1.0 \r\n";
	    $header .= "Content-Transfer-Encoding: 8bit \r\n";
	    $header .= "Date: ".date("r (T)")." \r\n";
	    $header .= iconv_mime_encode("Subject", "Nouveau message !");

	    $mailContent = "Un message de contact est arrivé de la part de " . $prenom . " " . $nom . " (" . $mail . ") : <br><br>" . $message . "<br>!---- FIN DU MESSAGE.<br><br> Ceci est un message automatique, merci de ne pas y répondre.";
		if(mail("garwan50@hotmail.com", "Nouveau message !", $mailContent, $header)) {
			echo json_encode(array("success" => "Votre message a été envoyé !"));
		}
		else echo json_encode(array("error" => "Une erreur inconnue est survenue, réessayez plus tard."));
	} else {
		echo json_encode($errors); // on renvoi les erreurs s'il y'en a
	}
 ?>