<?php 

include_once 'RepositorioUsuario.php';

class ValidadorRegistro{

	private $nombre;
	private $email;
	private $password;

	private $errorNombre;
	private $errorEmail;
	private $errorPassword1;
	private $errorPassword2;

	public function __construct($nombre, $email, $password1, $password2, $conexion){

		$this->nombre="";
		$this->email="";
		$this->password="";

		$this->errorNombre = $this->validarNombre($nombre, $conexion);
		$this->errorEmail = $this->validarEmail($email, $conexion);
		$this->errorPassword1 = $this->validarPassword1($password1);
		$this->errorPassword2 = $this->validarPassword2($password1, $password2);

		if ($this->errorPassword1==="" && $this->errorPassword2==="") {
			$this->password = $password1;
		}
	}

	private function variableIniciada($variable){

		if (isset($variable) && !empty($variable)){
			return true;
		}
		else{
			return false;
		}

	}

	private function validarNombre($nombre, $conexion){

		if(!$this->variableIniciada($nombre)){
			return "Ingrese un nombre de usuario por favor";
		}
		else{
			$this->nombre=$nombre;
		}

		if(strlen($nombre)<6){
			return "El nombre de usuario debe contener al menos 6 caracteres";
		}

		if(strlen($nombre)>30){
			return "El nombre de usuario no debe superar los 30 caracteres";
		}

		if(RepositorioUsuario::nombreExiste($conexion, $nombre)){
			return "El nombre ya está en uso, por favor ingrese otro nombre de usuario";
		}
		
		return "";
	}

	private function validarEmail($email, $conexion){

		if (!$this->variableIniciada($email)) {
			return "Ingrese su correo por favor";
		}
		else{
			$this->email=$email;
		}

		if (RepositorioUsuario::emailExiste($conexion, $email)) {
			return "El correo ya se encuentra en uso";
		}

		if (filter_var($email, FILTER_VALIDATE_EMAIL)==false) {
			return "Este correo ($email) no es válido, ejemplo: email@gmail.com";
		}

		return "";
	}

	private function validarPassword1($password){

		if (!$this->variableIniciada($password)) {
			return "Ingrese su contraseña antes de continuar";
		}

		if (strlen($password) < 6) {
			return "Por tu seguridad la contraseña debe contener al menos 6 caracteres";
		}

		if ($this->nombre===$password) {
			return "Por tu seguridad el nombre no debe ser igual a tu contraseña";
		}

		return "";
	}

	private function validarPassword2($password1, $password2){

		if (!$this->variableIniciada($password1)) {
			return "Ingrese primero su contraseña";
		}

		if (!$this->variableIniciada($password2)) {
			return "Repita su contraseña";
		}

		if ($password1!==$password2) {
			return "Las contraseñas no son iguales";
		}

		return "";
	}

	//GETTERS VARIABLES

	public function obtenerNombre(){
		return $this->nombre;
	}

	public function obtenerEmail(){
		return $this->email;
	}

	public function obtenerPassword(){
		return $this->password;
	}

	//GETTERS ERRORES

	public function obtenerErrorNombre(){
		return $this->errorNombre;
	}

	public function obtenerErrorEmail(){
		return $this->errorEmail;
	}

	public function obtenerErrorPassword1(){
		return $this->errorPassword1;
	}

	public function obtenerErrorPassword2(){
		return $this->errorPassword2;
	}

	public function registroValido(){
		if ($this->errorNombre==="" && $this->errorEmail==="" && $this->errorPassword1==="" && $this->errorPassword2==="") {
			return true;
		}
		else{
			return false;
		}
	}

}

?>