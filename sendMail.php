<?php
require('lib/PHPMailer/Exception.php');
require('lib/PHPMailer/PHPMailer.php');
require('lib/PHPMailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST["accion"])) {
	if($_POST["accion"] == "sendContact")	{
		$contenido = 
		'<div style="font-size:14px;">
	      <center>
	      	<b style="font-size: 20px; color: #0E6655;">
	      		¡Recibiste un correo desde la página Banquetes DON´S!
	      	</b>
	      </center>
	      <br><br>
	      <b>DATOS DE CONTACTO</b><br><br>
	      <b>Nombre: </b>'.$_POST["nombre"].'<br>
	      <b>Teléfono: </b>'.$_POST["telefono"].'<br>
	      <b>Dirección: </b>'.$_POST["correo"].'<br>
        <b>Mensaje: </b>'.$_POST["mensaje"].'<br>
	    </div>';

		$oMail             = new PHPMailer();				
		$oMail->isSMTP();
		$oMail->CharSet    = 'UTF-8';
		$oMail->Host       = 'banquetes-dons.com';  ///caso go daddy encuentras el host en url de cpanel
		$oMail->Username   = 'contacto@banquetes-dons.com';
		$oMail->Password   = 'H&5EppI^9eW0';

		/* $oMail->Host     = 'smtp.gmail.com';
		$oMail->Username   = 'miguel.gasperin9@gmail.com';
		$oMail->Password   = 'ceejaptvgjrndpxl'; */

		$oMail->Port       = 587;               //Puerto
		$oMail->SMTPSecure = 'tls';       //Tipo se seguridad
		$oMail->SMTPAuth   = true;          //True indica que se tendrá que aunténticar por FTP.
		$oMail->setFrom('contacto@banquetes-dons.com','Contacto desde DON´S');
		$oMail->addAddress('miguel.gasperin@hotmail.com','Hotmail');
		$oMail->addAddress('libad2023@hotmail.com','Atención a clientes');
		$oMail->Subject    = 'Contacto de cliente';
		$oMail->msgHTML($contenido);				
		if(!$oMail->send())
			$estatus = 'error';
		else
			$estatus = 'ok';

		header('Content-Type: application/json');
		$datos = array('estatus' => $estatus);	
		echo json_encode($datos, JSON_FORCE_OBJECT);
	}
}
?>