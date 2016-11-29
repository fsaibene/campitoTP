<?php
include_once '../vendor/autoload.php';
use \Firebase\JWT\JWT;
$DatosPorPost = file_get_contents("php://input");

$usuario =json_decode($DatosPorPost);


	$ClaveDeEncriptacion="estaeslaclave";
	//$key = "1234";
	
$token["mail"]=$usuario->mail;
	$token["clave"]=$usuario->clave;
	$token["nombre"]=$usuario->nombre;
	$token["perfil"]=$usuario->perfil;

 
	$token["iat"]=time();//momento de creacion
	$token["exp"]=time() + 20000000;
	$jwt = JWT::encode($token, $ClaveDeEncriptacion);


$ArrayConToken["CampitoToken"]=$jwt;
echo json_encode($ArrayConToken);

?>