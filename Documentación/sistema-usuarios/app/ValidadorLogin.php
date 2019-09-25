<?php 

class ValidadorLogin {

	private $usuario;
	private $error;

	public function __construct($email, $password, $conexion){

		$this->error = "";
		
		// La ! es la negacion de la sentencia
		if (!$this->variable_iniciada($email) || !$this->variable_iniciada($password)) {
			# code...
			$this->usuario = null;
			$this->error = "Sus datos ingresados no son correctos";
		}
		else{

			$this->usuario = RepositorioUsuario::obtenerUsuarioPorEmail($email, $conexion);

			if (is_null($this->usuario) || !password_verify($password, $this->usuario->obtenerPassword())) {
				# code...
				$error = "Datos Incorrectos";
			}

		}
	}
	private function variable_iniciada($variable){
		if (!isset($variable) && empty($variable)) {
			# code...
			return false;
		}
		else{
			return true;
		}
	}

	public function obtenerUsuario(){
		return $this->usuario;
	}

	public function obtenerError(){
		return $this->error;
	}
}

?>