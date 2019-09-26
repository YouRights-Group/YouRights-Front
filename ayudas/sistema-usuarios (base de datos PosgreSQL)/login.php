<!DOCTYPE html>
<html>
<head>
	<title>Login</title>

	<meta charset="utf-8">

	<meta http-equiv="X-UA-Compatible" content="IE-edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="css/bootstrap-theme.min.css">

	<link rel="stylesheet" type="text/css" href="css/estilos.css">

</head>
<body>

<div class="container" id='login'>
	<div class="panel panel-primary">
		<div class="panel-heading text-center">
			<h2>LOGIN</h2>
		</div>
		<form method="POST" action="app/registro-usuario.php">
			<div class="panel-body">
				
				<h4>Usuario: </h4>
				<input type="text" class="form-control" name="usuario" placeholder="usuario"><br>
				<h4>Contraseña: </h4>
				<input type="password" class="form-control" name="pasword" placeholder="contraseña">
			</div>
			<div class="panel-footer">
				<button type="submit" class="btn btn-primary">Ingresar</button>
				<button class="btn btn-warning">Registrar</button>
			</div>
		</form>
	</div>
</div>

<!-- Latest compiled and minified JavaScript -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>

</body>
</html>