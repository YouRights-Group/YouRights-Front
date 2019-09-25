<?php 

class RepositorioUsuario {

	public static function insertarUsuario($conexion, $usuario){

		$usuarioInsertado = false;

		if (isset($conexion)){

			try{

				$sql = "INSERT INTO usuarios (usu_nombre, usu_email, usu_password, usu_estado) values (:nombre, :email, :password, :estado)";

				$sentencia = $conexion->prepare($sql);

				$nombre = $usuario->obtenerNombre();
				$email = $usuario->obtenerEmail();
				$password = $usuario->obtenerPassword();
				$estado = $usuario->obtenerEstado();

				$sentencia->bindParam(':nombre', $nombre, PDO::PARAM_STR);
				$sentencia->bindParam(':email', $email, PDO::PARAM_STR);
				$sentencia->bindParam(':password', $password, PDO::PARAM_STR);
				$sentencia->bindParam(':estado', $estado, PDO::PARAM_STR);

				$usuarioInsertado = $sentencia->execute();

				$usuarioInsertado = true;

			}
			catch(PDOException $e){
				print "ERROR". $e->getMessage();
			}
		}
		return $usuarioInsertado; //true o false
	}

	public static function obtenerUsuarioPorEmail($email, $conexion){

		$usuario = null;

		if (isset($conexion)) {
			# code...
			try {

				include_once 'Usuario.php';

				$sql = "SELECT * FROM usuarios WHERE usu_email = :email";
				
				$sentencia = $conexion->prepare($sql);
				$sentencia->bindParam(':email', $email, PDO::PARAM_STR);
				$sentencia->execute();

				$resultado = $sentencia -> fetch();

				if (!empty($resultado)) {
					
					$usuario = new Usuario($resultado['usu_id'], $resultado['usu_nombre'], $resultado['usu_password'], $resultado['usu_email'], $resultado['usu_estado']);
				}

			} catch (PDOException $e) {
				print "ERROR". $e -> getMessage();
				die();
			}
		}

		return $usuario;
	}

	public static function nombreExiste($conexion, $nombre){

		$nombreExiste = true;

		if(isset($conexion)){

			try{

				$sql = "SELECT * FROM usuarios where usu_nombre = :nombre";

				$sentencia = $conexion->prepare($sql);

				$sentencia->bindParam(':nombre', $nombre, PDO::PARAM_STR);

				$sentencia->execute();

				$resultado = $sentencia->fetchAll();

				if(count($resultado)){
					$nombreExiste = true;
				}
				else{
					$nombreExiste = false;
				}

			}catch(PDOException $e){
				print "ERROR ". $e->getMessage();
			}

		}

		return $nombreExiste;
	}

	public static function emailExiste($conexion, $email){

		$emailExiste = true;

		if(isset($conexion)){

			try{

				$sql = "SELECT * FROM usuarios where usu_email = :email";

				$sentencia = $conexion->prepare($sql);

				$sentencia->bindParam(':email', $email, PDO::PARAM_STR);

				$sentencia->execute();

				$resultado = $sentencia->fetchAll();

				if(count($resultado)){
					$emailExiste = true;
				}
				else{
					$emailExiste = false;
				}

			}catch(PDOException $e){
				print "ERROR ". $e->getMessage();
			}

		}

		return $emailExiste;
	}

}

?>