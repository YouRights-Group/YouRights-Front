//  https://www.youtube.com/watch?v=1b4NzbSJ7dI&list=PLHAwr9gJjquel5iPqOXxPQkV2Dou6zddO&index=11
//  https://www.youtube.com/watch?v=mQ6kXrBqJcc
//  https://www.youtube.com/watch?v=29Dp2mSwS4w
//  https://www.youtube.com/watch?v=keO6egndYrE
//  https://www.youtube.com/watch?v=V5-pqK37pZg
//  https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-waypoints

var marker = [];
var directionsService = [];
var directionsRenderer = [];

function initialize() {
	var city,
		infoWindow = "",
		addressEl = document.querySelector("#map-search"),
		latEl = document.querySelector(".latitude"),
		longEl = document.querySelector(".longitude"),
		city = document.querySelector(".reg-input-city");

	directionsService = new google.maps.DirectionsService();
	directionsRenderer = new google.maps.DirectionsRenderer();

	var map = new google.maps.Map(document.getElementById("map_canvas"), {
		zoom: 5,
		center: {
			lat: 40.42928819958918,
			lng: -3.6999707343627506
		},
		disableDefaultUI: false,
		scrollWheel: true,
		draggable: true
	});

	directionsRenderer.setMap(map);

	marker = new google.maps.Marker({
		position: map.center,
		map: map,
		draggable: true
	});
	console.log(marker);
	var searchBox = new google.maps.places.SearchBox(addressEl);

	google.maps.event.addListener(searchBox, "places_changed", function () {
		var places = searchBox.getPlaces(),
			bounds = new google.maps.LatLngBounds(),
			i,
			place,
			lat,
			long,
			resultArray,
			addresss = places[0].formatted_address;

		for (i = 0;
			(place = places[i]); i++) {
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
			if (
				resultArray[i].types[0] &&
				"administrative_area_level_2" === resultArray[i].types[0]
			) {
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

	google.maps.event.addListener(marker, "dragend", function hola(event) {
		var lat, long, address, resultArray, citi;

		console.log("i am dragged");
		lat = marker.getPosition().lat();
		long = marker.getPosition().lng();

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			latLng: marker.getPosition()
		},
			function (result, status) {
				if ("OK" === status) {
					// This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
					console.log(result[0]);
					address = result[0].formatted_address;
					resultArray = result[0].address_components;

					// Get the city and set the city input value to the one selected
					for (var i = 0; i < resultArray.length; i++) {
						if (
							resultArray[i].types[0] &&
							"administrative_area_level_2" === resultArray[i].types[0]
						) {
							citi = resultArray[i].long_name;
							console.log(citi);
							city.value = citi;
						}
					}
					addressEl.value = address;
					latEl.value = lat;
					longEl.value = long;
				} else {
					console.log(
						"Geocode was not successful for the following reason: " + status
					);
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
			}
		);
	});

	$("#rutear").on("click", function () {
		calculateAndDisplayRoute(directionsService, directionsRenderer);
	});
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	waypoints = [];
	getDataRoute();

	directionsService.route({
		origin: startPoint,
		destination: endPoint,
		waypoints: waypoints,
		travelMode: google.maps.TravelMode.WALKING
	},
		function (response, status) {
			if (status == "OK") {
				directionsRenderer.setDirections(response);
			} else {
				window.alert("Directions request failed due to " + status);
			}
		}
	);
}

$("#save-point-map").on("click", function () {
	pointLat = $(".latitude").val();
	pointLong = $(".longitude").val();
	pointAddress = $(".controls").val();
	agregarWaypoint();
});

$("#delete-point-map").on("click", function () {
	deleteId(id_line_selected);
});
$("#deleteAll-point-map").click(function () {
	deleteAllLine();
});

var pointLat = $(".latitude").val();
var pointLong = $(".longitude").val();
var pointAddress = $(".controls").val();
var idPointMap = '';
var isFirst = true;
var getWaypoints = [];
var startPoint = [];
var endPoint = [];
var waypoints = [];

function agregarWaypoint() {
	idPointMap++;
	linePointMap = `
		<tr class="selected waypoint" id="${idPointMap}" onclick="selected(this.id);">
			<td >${idPointMap}</td>
			<td id="dataMapAddress${idPointMap}">${pointAddress}</td>
			<td id="dataMapLat${idPointMap}" class="d-none">${pointLat}</td>
			<td id="dataMapLong${idPointMap}" class="d-none">${pointLong}</td>
		</tr>
	`;
	$("#outputTableMap").append(linePointMap);
	
	function waypoint(id, address, lat, lng) {
		this.id = id;
		this.address = address;
		this.lat = lat;
		this.lng = lng;
	}

	waypts = new waypoint(idPointMap, pointAddress, pointLat, pointLong);

	function getwayptsLatLng(lat, lng) {
		this.lat = lat;
		this.lng = lng;
	}
	wayptsLatLng = new getwayptsLatLng(pointLat, pointLong);
	console.log(wayptsLatLng);

	getWaypoint();
	arrangeId();
}

var dataBaseWaypoint = [];
var getdataBaseWaypointRoute = [];

function getWaypoint() {
	dataBaseWaypoint.push(waypts);
	getdataBaseWaypointRoute.push(wayptsLatLng);
}

function getDataRoute() {
	console.log(getdataBaseWaypointRoute);
	getStartPoint = getdataBaseWaypointRoute[0];
	getEndPoint = getdataBaseWaypointRoute[getdataBaseWaypointRoute.length - 1];
	startPoint = getStartPoint.lat + ", " + getStartPoint.lng;
	endPoint = getEndPoint.lat + ", " + getEndPoint.lng;

	for (var i = 1; i < getdataBaseWaypointRoute.length - 1; i++) {
		getWaypoints = getdataBaseWaypointRoute[i].lat + ", " + getdataBaseWaypointRoute[i].lng;
		console.log(getWaypoints);
		if (getdataBaseWaypointRoute[i]) {
			waypoints.push({
				location: getWaypoints,
				stopover: true
			});
			console.log(getWaypoints);
			console.log(waypoints);
		}
	}

	// startPointAddress = startPoint.address;
	// endPointAddress = endPoint.address;

	console.log(waypts);
	console.log(dataBaseWaypoint);
	console.log(getdataBaseWaypointRoute);
	console.log(startPoint);
	console.log(endPoint);
	console.log(waypoints);
}

function selected(id_line) {
	if ($("#" + id_line).hasClass("seleccionada")) {
		$("#" + id_line).removeClass("seleccionada");
	} else {
		$("#" + id_line).addClass("seleccionada");
	}
	id_line_selected = id_line;
}

function deleteId(id_line) {
	var ccc = id_line-1;
	$("#" + id_line).remove();
	dataBaseWaypoint.splice(ccc,1);
	getdataBaseWaypointRoute.splice(ccc,1);
	arrangeId();
}

function arrangeId() {
	var num1 = 1;
	$("#table-map tbody tr").each(function () {
		$(this).eq(0).attr("id", num1);
		$(this).find("td").eq(0).text(num1);
		$(this).find("td").eq(1).attr("id","dataMapAddress" + num1);
		$(this).find("td").eq(2).attr("id","dataMapLat" + num1);
		$(this).find("td").eq(3).attr("id","dataMapLong" + num1);
		
		num1++;

	});
	
	for (var i = 0; i < dataBaseWaypoint.length; i++) {
		Object.defineProperty(dataBaseWaypoint[i], "id", {value : i});
	};
}

function deleteAllLine() {
	$('.waypoint').remove();
	dataBaseWaypoint = [];
	getdataBaseWaypointRoute = [];
	directionsRenderer.setDirections({routes: []}); 
	arrangeId()
}