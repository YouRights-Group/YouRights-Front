<?php

class Usuario {

	private $id;
	private $nombre;
	private $email;
	private $password;
	private $estado;

	public function __construct ($id, $nombre, $email, $password, $estado){
		$this->nombre = $nombre;
		$this->email = $email;
		$this->password = $password;
		$this->estado = $estado;
	}

	public function obtenerId(){
		return $this->id;
	}

	public function obtenerNombre(){
		return $this->nombre;
	}

	public function obtenerEmail(){
		return $this->email;
	}

	public function obtenerPassword(){
		return $this->password;
	}

	public function obtenerEstado(){
		return $this->estado;
	}


}

?>