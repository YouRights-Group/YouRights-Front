<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Uso de DataTables</title>
	<!-- El CSS de DataTables -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/af-2.1.2/b-1.2.2/b-colvis-1.2.2/b-flash-1.2.2/b-html5-1.2.2/b-print-1.2.2/cr-1.3.2/fc-3.2.2/fh-3.1.2/kt-2.1.3/r-2.1.0/rr-1.1.2/sc-1.4.2/se-1.2.0/datatables.min.css"/>
	<!-- El CSS de Bootstrap -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">-->
</head>
<body>
	<div class="container">
		<div class="row"><br></div>
		<header>
			<div class="row">
				<div class="col-sm-2"><label for="id_campo">Buscar en campo:</label></div>
				<div class="col-sm-2">
					<select class="form-control input-sm" id="id_campo">
						<option value="0" selected>NOMBRE</option>
						<option value="1">APELLIDO</option>
						<option value="2">CARGO</option>
						<option value="3">CIUDAD</option>
						<option value="4">INGRESO</option>
						<option value="5">SALARIO</option>
					</select>
				</div>
				<div class="col-sm-2">
					<select class="form-control input-sm" id="id_operacion">
						<option value="0" selected>Es igual a</option>
						<option value="1">No es igual a</option>
						<option value="2">Contiene</option>
						<option value="3">No contiene</option>
						<option value="4">Empieza por</option>
						<option value="5">No empieza por</option>
						<option value="6">Acaba por</option>
						<option value="7">No acaba por</option>
						<option value="8">Es menor que</option>
						<option value="9">Es menor o igual que</option>
						<option value="10">Es mayor que</option>
						<option value="11">Es mayor o igual que</option>
					</select>
				</div>
				<div class="col-sm-2">
					<input type="text" class="form-control input-sm" id="valor_a_comparar">
				</div>
				<div class="col-sm-2">
					<input type="button" class="btn btn-primary btn-sm" id="boton_buscar" value="Buscar" disabled>
				</div>
				<div class="col-sm-2">
					<input type="button" class="btn btn-warning btn-sm" id="boton_resetear" value="Resetear búsqueda" disabled>
				</div>
			</div>
		</header>
		<div class="row"><br></div>
		<div class="row">
			<div class="col-sm-12">
				<table id="tabla_de_personal" class="table display table-striped table-bordered">
					<thead>
						<tr>
							<th>NOMBRE</th>
							<th>APELLIDO</th>
							<th>CARGO</th>
							<th>CIUDAD</th>
							<th>INGRESO</th>
							<th>SALARIO</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- jQuery -->
	<script language="javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<!-- El JavaScript de DataTables -->
	<script language="javascript" type="text/javascript" src="https://cdn.datatables.net/v/dt/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/af-2.1.2/b-1.2.2/b-colvis-1.2.2/b-flash-1.2.2/b-html5-1.2.2/b-print-1.2.2/cr-1.3.2/fc-3.2.2/fh-3.1.2/kt-2.1.3/r-2.1.0/rr-1.1.2/sc-1.4.2/se-1.2.0/datatables.min.js"></script>
	<!-- El JavaScript de BootStrap -->
	<script language="javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

	<!-- El código JavaScript -->
	<script language="javascript">
		var objetoDataTables_personal = $('#tabla_de_personal').DataTable({
			"language": {
				"emptyTable":			"No hay datos disponibles en la tabla.",
				"info":		   			"Del _START_ al _END_ de _TOTAL_ ",
				"infoEmpty":			"Mostrando 0 registros de un total de 0.",
				"infoFiltered":			"(filtrados de un total de _MAX_ registros)",
				"infoPostFix":			"(actualizados)",
				"lengthMenu":			"Mostrar _MENU_ registros",
				"loadingRecords":		"Cargando...",
				"processing":			"Procesando...",
				"search":				"Buscar:",
				"searchPlaceholder":	"Dato para buscar",
				"zeroRecords":			"No se han encontrado coincidencias.",
				"paginate": {
					"first":			"Primera",
					"last":				"Última",
					"next":				"Siguiente",
					"previous":			"Anterior"
				},
				"aria": {
					"sortAscending":	"Ordenación ascendente",
					"sortDescending":	"Ordenación descendente"
				}
			},
			"lengthMenu":				[[5, 10, 20, 25, 50, -1], [5, 10, 20, 25, 50, "Todos"]],
			"iDisplayLength":			10,
			"bServerSide":				true,
			"sAjaxSource":				"datos_externos_07.php",
			"columns" : [
				{"data": 0},
				{"data": 1},
				{"data": 2},
				{"data": 3}, 
				{"data": 4}, 
				{"data": 5}
			],
		});
		$('label').addClass('form-inline');
		$('select, input[type="search"]').addClass('form-control input-sm');

		/* Comprobamos si se activa o desactiva el botón de búsqueda personalizada y el de reseteo. */
		$('#valor_a_comparar').on('keyup keypress change', function(){
			$('#boton_buscar').prop('disabled', ($('#valor_a_comparar').prop('value') == ""));
			$('#boton_resetear').prop('disabled', ($('#id_campo').prop('value') == "0" && $('#id_operacion').prop('value') == "0" && $('#id_campo').prop('value') == ""));
		});
		$('#id_campo, #id_operacion').on('change', function(){
			$('#boton_resetear').prop('disabled', ($('#id_campo').prop('value') == "0" && $('#id_operacion').prop('value') == "0" && $('#valor_a_comparar').prop('value') == ""));
		});

		/* Si se pulsa el botón de reset. */
		$('#boton_resetear').on('click', function(){
			$('#id_campo, #id_operacion').prop('value', '0');
			$('#valor_a_comparar').prop('value', '');
			$('#boton_buscar').prop('disabled', true);
			$('#boton_resetear').prop('disabled', true);
			objetoDataTables_personal
				.columns([0,1,2,3,4,5])
				.search('')
				.draw();
		});

		/* Cuando se pulsa el botón de búsqueda se construye la recla de búsqueda según se ha solicitado. */
		$('#boton_buscar').on('click', function(){
			var clausula = "";
			switch ($('#id_operacion').prop('value')) {
				case '0':
					clausula = " = '" + $('#valor_a_comparar').prop('value') + "' "; // Es igual a lo que hay en el campo de texto
					break;
				case '1':
					clausula = " != '" + $('#valor_a_comparar').prop('value') + "' "; // No es igual a lo que hay en el campo de texto
					break;
				case '2':
					clausula = " LIKE '%" + $('#valor_a_comparar').prop('value') + "%' "; // Contiene lo que hay en el campo de texto
					break;
				case '3':
					clausula = " NOT LIKE '%" + $('#valor_a_comparar').prop('value') + "%' "; // No contiene lo que hay en el campo de texto
					break;
				case '4':
					clausula = " LIKE '" + $('#valor_a_comparar').prop('value') + "%' "; // Empieza por lo que hay en el campo de texto
					break;
				case '5':
					clausula = " NOT LIKE '" + $('#valor_a_comparar').prop('value') + "%' "; // No empieza por lo que hay en el campo de texto
					break;
				case '6':
					clausula = " LIKE '%" + $('#valor_a_comparar').prop('value') + "' "; // Acaba por lo que hay en el campo de texto
					break;
				case '7':
					clausula = " NOT LIKE '%" + $('#valor_a_comparar').prop('value') + "' "; // No acaba por lo que hay en el campo de texto
					break;
				case '8':
					clausula = " < '" + $('#valor_a_comparar').prop('value') + "' "; // Es menor que lo que hay en el campo de texto
					break;
				case '9':
					clausula = " <= '" + $('#valor_a_comparar').prop('value') + "' "; // Es menor o igual que lo que hay en el campo de texto
					break;
				case '10':
					clausula = " > '" + $('#valor_a_comparar').prop('value') + "' "; // Es mayor que lo que hay en el campo de texto
					break;
				case '11':
					clausula = " >= '" + $('#valor_a_comparar').prop('value') + "' "; // Es mayor o igual que lo que hay en el campo de texto
					break;
			}
			objetoDataTables_personal
				.columns([0,1,2,3,4,5])
				.search('')
				.column($('#id_campo').prop('value'))
				.search(clausula)
				.draw();
		});
	</script>
</body>
</html>