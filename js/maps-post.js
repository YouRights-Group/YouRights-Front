//  https://www.youtube.com/watch?v=1b4NzbSJ7dI&list=PLHAwr9gJjquel5iPqOXxPQkV2Dou6zddO&index=11
//  https://www.youtube.com/watch?v=mQ6kXrBqJcc
//  https://www.youtube.com/watch?v=29Dp2mSwS4w
//  https://www.youtube.com/watch?v=keO6egndYrE
//  https://www.youtube.com/watch?v=V5-pqK37pZg
//  https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-waypoints

var marker = [];

function initialize() {

	var mapOptions, map, searchBox, city,
		infoWindow = '',
		addressEl = document.querySelector('#map-search'),
		latEl = document.querySelector('.latitude'),
		longEl = document.querySelector('.longitude'),
		element = document.getElementById('map_canvas');
	city = document.querySelector('.reg-input-city');
	console.log(latEl);

	var directionsService = new google.maps.DirectionsService;
	var directionsRenderer = new google.maps.DirectionsRenderer;

	var mapOptions = {
		// How far the maps zooms in.
		zoom: 5,
		// Current Lat and Long position of the pin/
		center: new google.maps.LatLng(40.42928819958918, -3.6999707343627506),
		// center : {
		// 	lat: -34.397,
		// 	lng: 150.644
		// },
		disableDefaultUI: false, // Disables the controls like zoom control on the map if set to true
		scrollWheel: true, // If set to false disables the scrolling on the map.
		draggable: true, // If set to false , you cannot move the map around.
		// mapTypeId: google.maps.MapTypeId.HYBRID, // If set to HYBRID its between sat and ROADMAP, Can be set to SATELLITE as well.
		// maxZoom: 11, // Wont allow you to zoom more than this
		// minZoom: 9  // Wont allow you to go more up.

	};
	console.log(mapOptions.center);

	directionsRenderer.setMap(map);

	/**
	 * Creates the map using google function google.maps.Map() by passing the id of canvas and
	 * mapOptions object that we just created above as its parameters.
	 *
	 */
	// Create an object map with the constructor function Map()
	map = new google.maps.Map(element, mapOptions); // Till this like of code it loads up the map.

	/**
	 * Creates the marker on the map
	 *
	 */
	marker = new google.maps.Marker({
		position: mapOptions.center,
		map: map,
		// icon: 'http://pngimages.net/sites/default/files/google-maps-png-image-70164.png',
		draggable: true
	});
	console.log(marker);

	/**
	 * Creates a search box
	 */
	searchBox = new google.maps.places.SearchBox(addressEl);

	/**
	 * When the place is changed on search box, it takes the marker to the searched location.
	 */
	google.maps.event.addListener(searchBox, 'places_changed', function () {
		var places = searchBox.getPlaces(),
			bounds = new google.maps.LatLngBounds(),
			i, place, lat, long, resultArray,
			addresss = places[0].formatted_address;

		for (i = 0; place = places[i]; i++) {
			bounds.extend(place.geometry.location);
			marker.setPosition(place.geometry.location); // Set marker position new.
		}

		map.fitBounds(bounds); // Fit to the bound
		map.setZoom(15); // This function sets the zoom to 15, meaning zooms to level 15.
		// console.log( map.getZoom() );

		lat = marker.getPosition().lat();
		long = marker.getPosition().lng();
		latEl.value = lat;
		longEl.value = long;

		resultArray = places[0].address_components;

		// Get the city and set the city input value to the one selected
		for (var i = 0; i < resultArray.length; i++) {
			if (resultArray[i].types[0] && 'administrative_area_level_2' === resultArray[i].types[0]) {
				citi = resultArray[i].long_name;
				city.value = citi;
			}
		}

		// Closes the previous info window if it already exists
		if (infoWindow) {
			infoWindow.close();
		}
		/**
		 * Creates the info Window at the top of the marker
		 */
		infoWindow = new google.maps.InfoWindow({
			content: addresss
		});

		infoWindow.open(map, marker);
	});


	/**
	 * Finds the new position of the marker when the marker is dragged.
	 */
	google.maps.event.addListener(marker, "dragend", function hola(event) {
		var lat, long, address, resultArray, citi;

		console.log('i am dragged');
		lat = marker.getPosition().lat();
		long = marker.getPosition().lng();

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			latLng: marker.getPosition()
		}, function (result, status) {
			if ('OK' === status) { // This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
				console.log(result[0]);
				address = result[0].formatted_address;
				resultArray = result[0].address_components;

				// Get the city and set the city input value to the one selected
				for (var i = 0; i < resultArray.length; i++) {
					if (resultArray[i].types[0] && 'administrative_area_level_2' === resultArray[i].types[0]) {
						citi = resultArray[i].long_name;
						console.log(citi);
						city.value = citi;
					}
				}
				addressEl.value = address;
				latEl.value = lat;
				longEl.value = long;

			} else {
				console.log('Geocode was not successful for the following reason: ' + status);
			}

			// Closes the previous info window if it already exists
			if (infoWindow) {
				infoWindow.close();
			}

			/**
			 * Creates the info Window at the top of the marker
			 */
			infoWindow = new google.maps.InfoWindow({
				content: address
			});

			infoWindow.open(map, marker);
		});
	});
	console.log(mapOptions.center);

	$('#rutear').on("click", function () {
		calculateAndDisplayRoute(directionsService, directionsRenderer);
	});

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	var waypts = [];
	var checkboxArray = $('.waypoint');
	for (var i = 1; i < checkboxArray.length; i++) {
		if (checkboxArray.dataMapAddress[i]) {
			console.log(this);
		}
	}
	console.log(waypts);

	console.log(start);

	var end = waypts[waypts.length-1];
	
	console.log($('.start'));
	console.log(end);

	directionsService.route({
		origin: start,
		destination: end,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: 'DRIVING'
	}, function (response, status) {
		if (status === 'OK') {
			directionsRenderer.setDirections(response);
			var route = response.routes[0];
		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});
}

$("#save-point-map").on("click", function () {

	pointLat = $(".latitude").val();
	pointLong = $(".longitude").val();
	pointAddress = $(".controls").val();
	console.log(pointLat);
	console.log(pointLong);
	console.log(pointAddress);

	agregarWaypoint();
});

$("#delete-point-map").on("click", function () {
	deleteId(id_line_selected);
});
$('#deleteAll-point-map').click(function () {
	deleteAllLine();
});

var pointLat = $(".latitude").val();
var pointLong = $(".longitude").val();
var pointAddress = $(".controls").val();
var idPointMap = 0;
var isFirst = true;
var start = [];
var end = [];
var waypoints = [];

function agregarWaypoint() {
	idPointMap++;
	linePointMap = `
		<tr class="selected waypoint" id="line${idPointMap}" onclick="selected(this.id);">
			<td>${idPointMap}</td>
			<td id="dataMapAddress${idPointMap}">${pointAddress}</td>
			<td id="dataMapLat${idPointMap}" class="d-none">${pointLat}</td>
			<td id="dataMapLong${idPointMap}" class="d-none">${pointLong}</td>
		</tr>
	`
	$('#outputTableMap').append(linePointMap);
	arrangeId();
	

	function waypoint(id,address,latitude,longitude){
		this.id=id;
		this.address=address;
		this.latitude=latitude;
		this.longitude=longitude;
	}

	waypts = new waypoint (
		idPointMap,
		pointAddress,
		pointLat,
		pointLong
	);
	getWaypoint();
}

var dataBaseWaypoint = [];
function getWaypoint(){
	dataBaseWaypoint.push(waypts);
	start = dataBaseWaypoint[0];
	end = dataBaseWaypoint[dataBaseWaypoint.length-1];
	waypoints = dataBaseWaypoint - start;
	console.log(dataBaseWaypoint);
	console.log(start);
	console.log(end);
	console.log(waypoints);
};

function selected(id_line) {
	if ($('#' + id_line).hasClass('seleccionada')) {
		$('#' + id_line).removeClass('seleccionada');
	} else {
		$('#' + id_line).addClass('seleccionada');
	}
	id_line_selected = id_line;
};

function deleteId(id_line) {
	$('#' + id_line).remove();
	arrangeId();
};

function arrangeId() {
	var num = 1;
	$('#table-map tbody tr').each(function () {
		$(this).find('td').eq(0).text(num);
		num++;
	});
};

function deleteAllLine() {
	$('#tabla tbody tr').each(function () {
		$(this).remove();
	});

}