
var directionsService;
var directionsRenderer;
var map;
//  viene de maps-post.js ( del que busca la calle )
var mapOptions, searchBox, city,
		infoWindow = '',
		addressEl = document.querySelector( '#map-search' ),
		latEl = document.querySelector( '.latitude' ),
		longEl = document.querySelector( '.longitude' ),
		element = document.getElementById( 'map_canvas' );
		city = document.querySelector( '.reg-input-city' );
		console.log(latEl);


function initialize() {
	var position = new google.maps.LatLng(40.42928819958918, -3.6999707343627506);
	
	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();
	map = new google.maps.Map(document.getElementById("map_canvas"), {
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: position
	});
	
	directionsRenderer.setMap(map);
	
	google.maps.event.addListener(map, 'click', function(event) {
        addWayPointToRoute(event.latLng);
        
    });
}


var markers = [];
var polylines = [];
var isFirst = true;

function addWayPointToRoute(location) {
	if (isFirst) {
		addFirstWayPoint(location);
		isFirst = false;
	} else {
		appendWayPoint(location);
	}
}

function addFirstWayPoint(location) {
	var request = {
		origin: location,
		destination: location,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};
	directionsService.route(request, function(response, status) {
        var lat, long, address, resultArray, citi;

		if (status == google.maps.DirectionsStatus.OK) {
			var marker = new google.maps.Marker({
				position: response.routes[0].legs[0].start_location, 
				map: map,
				draggable : true
			});
			marker.arrayIndex = 0;
			markers.push(marker);
			google.maps.event.addListener(marker, 'dragend', function() {
                recalculateRoute(marker);
                
            });
        };
        //  viene de maps-post.js ( del que busca la calle )
        var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { latLng: marker.getPosition() }, function ( result, status ) {
			if ( 'OK' === status ) {  // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
				console.log(result[0]);
				address = result[0].formatted_address;
				resultArray =  result[0].address_components;

				// Get the city and set the city input value to the one selected
				for( var i = 0; i < resultArray.length; i++ ) {
					if ( resultArray[ i ].types[0] && 'administrative_area_level_2' === resultArray[ i ].types[0] ) {
						citi = resultArray[ i ].long_name;
						console.log( citi );
						city.value = citi;
					}
                }
                lat = marker.getPosition().lat();
                long = marker.getPosition().lng();
				addressEl.value = address;
				latEl.value = lat;
				longEl.value = long;

			} else {
				console.log( 'Geocode was not successful for the following reason: ' + status );
			}

			// Closes the previous info window if it already exists
			if ( infoWindow ) {
				infoWindow.close();
			}

			/**
			 * Creates the info Window at the top of the marker
			 */
			infoWindow = new google.maps.InfoWindow({
				content: address
			});

			infoWindow.open( map, marker );
		} );
	});
}

function appendWayPoint(location) {
	var request = {
		origin: markers[markers.length - 1].position,
		destination: location,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	};
	
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var marker = new google.maps.Marker({
				position: response.routes[0].legs[0].end_location, 
				map: map,
				draggable : true
			});
			markers.push(marker);
			marker.arrayIndex = markers.length - 1;
			google.maps.event.addListener(marker, 'dragend', function() {
				recalculateRoute(marker);
			});
			
			var polyline = new google.maps.Polyline();
			var path = response.routes[0].overview_path;
			for (var x in path) {
				polyline.getPath().push(path[x]);
			}
			polyline.setMap(map);
            polylines.push(polyline);
            lat = marker.getPosition().lat();
            console.log(lat);
		}
	});
}

function recalculateRoute(marker) { //recalculate the polyline to fit the new position of the dragged marker
	if (marker.arrayIndex > 0) { //its not the first so recalculate the route from previous to this marker
		polylines[marker.arrayIndex - 1].setMap(null);
		
		var request = {
			origin: markers[marker.arrayIndex - 1].position,
			destination: marker.position,
			travelMode: google.maps.DirectionsTravelMode.WALKING
		};
		
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var polyline = new google.maps.Polyline();
				var path = response.routes[0].overview_path;
				for (var x in path) {
					polyline.getPath().push(path[x]);
				}
				polyline.setMap(map);
				polylines[marker.arrayIndex - 1] = polyline;
			}
		});
	}
	if (marker.arrayIndex < markers.length - 1) { //its not the last, so recalculate the route from this to next marker
		polylines[marker.arrayIndex].setMap(null);
		
		var request = {
			origin: marker.position,
			destination: markers[marker.arrayIndex + 1].position,
			travelMode: google.maps.DirectionsTravelMode.WALKING
		};
		
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var polyline = new google.maps.Polyline();
				var path = response.routes[0].overview_path;
				for (var x in path) {
					polyline.getPath().push(path[x]);
				}
				polyline.setMap(map);
				polylines[marker.arrayIndex] = polyline;
			}
		});
	}
}

function placeMarker(location) {
	var request = {
		origin: location, 
		destination: location,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			var marker = new google.maps.Marker({
				position: response.routes[0].legs[0].start_location, 
				map: map
			});
		}
	});
}


//  viene de maps-post.js ( del que busca la calle )
// ----------  PARA GUARDAR EN LISTA   ------------------

$("#save-point-map").on("click", function (){

	pointLat = $(".latitude").val();
	pointLong = $(".longitude").val();
	pointAddress = $(".controls").val();
	console.log(pointLat);
	console.log(pointLong);
	console.log(pointAddress);

	agregar();	
});

$("#delete-point-map").on("click", function (){
	deleteId(id_line_selected);
});
$('#deleteAll-point-map').click(function(){
	deleteAllLine();
});

var pointLat = $(".latitude").val();
var pointLong = $(".longitude").val();
var pointAddress = $(".controls").val();
var idPointMap = 0;

function agregar(){
	idPointMap++;
	linePointMap = `
		<tr class="selected" id="line${idPointMap}" onclick="selected(this.id);">
			<td>${idPointMap}</td>
			<td id="dataMapAddress${idPointMap}">${pointAddress}</td>
			<td id="dataMapLat${idPointMap}" class="d-none">${pointLat}</td>
			<td id="dataMapLong${idPointMap}" class="d-none">${pointLong}</td>
		</tr>
	`
	$('#outputTableMap').append(linePointMap);
    arrangeId();
}

function selected(id_line){
	if($('#'+id_line).hasClass('seleccionada')){
		$('#'+id_line).removeClass('seleccionada');
	}else{
		$('#'+id_line).addClass('seleccionada');
	}
	id_line_selected=id_line;
};

function deleteId(id_line){
	$('#'+id_line).remove();
	arrangeId();
};

function arrangeId(){
	var num = 1;
	$('#table-map tbody tr').each(function(){
		$(this).find('td').eq(0).text(num);
		num++;
	});
};
function deleteAllLine(){
	$('#tabla tbody tr').each(function(){
		$(this).remove();
	});
	
}
