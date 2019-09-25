<?php 

include_once 'config.php';
include_once 'conexion.php';
include_once 'Usuario.php';
include_once 'RepositorioUsuario.php';
include_once 'ValidadorRegistro.php';

Conexion::abrirConexion();

$validador = new ValidadorRegistro($_POST['usuario'], $_POST['email'], htmlspecialchars($_POST['password1']), htmlspecialchars($_POST['password2']), Conexion::obtenerConexion());

if ($validador->RegistroValido()) {
	# code...

	$usuario = new Usuario('', $validador->obtenerNombre(), $validador->obtenerEmail(), password_hash($validador->obtenerPassword(), PASSWORD_DEFAULT), '1');

	$insertar_usuario = RepositorioUsuario::insertarUsuario(Conexion::obtenerConexion(), $usuario);

	if ($insertar_usuario) {
		# code...
		echo "insertado";
	}
	else{
		echo 'no insertado';
	}
}
else{

	$error = array(
		'errorNombre' => $validador->obtenerErrorNombre(),
		'errorEmail'  => $validador->obtenerErrorEmail(),
		'errorP1'  => $validador->obtenerErrorPassword1(),
		'errorP2'  => $validador->obtenerErrorPassword2()
	);

	echo json_encode($error);
}

Conexion::cerrarConexion();

?>