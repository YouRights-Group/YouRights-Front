//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

//  https://www.youtube.com/watch?v=1b4NzbSJ7dI&list=PLHAwr9gJjquel5iPqOXxPQkV2Dou6zddO&index=11
//  https://www.youtube.com/watch?v=mQ6kXrBqJcc
//  https://www.youtube.com/watch?v=29Dp2mSwS4w
//  https://www.youtube.com/watch?v=keO6egndYrE
//  https://www.youtube.com/watch?v=V5-pqK37pZg
//  https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-waypoints
//  https://www.youtube.com/watch?v=-AR-6X_98rM


const protestsCreate = document.getElementById('form-protests-create');

//  ----------------   Contador <-    -----------------  //

init_contador("protestLetter", "letterLength", 280);

function init_contador(protestLetter, letterLength, max) {
    $("#" + protestLetter).keyup(function () {
        updateContador(protestLetter, letterLength, max);
    });

    $("#" + protestLetter).change(function () {
        updateContador(protestLetter, letterLength, max);
    });

}

function updateContador(protestLetter, letterLength, max) {
    var contador = $("#" + letterLength);
    var ta = $("#" + protestLetter);
    contador.html("0/" + max);

    contador.html(ta.val().length + "/" + max);
    if (parseInt(ta.val().length) > max) {
        ta.val(ta.val().substring(0, max - 1));
        contador.html(max + "/" + max);
    }
}

//  ----------------   Contador ->    -----------------  //


//  -----------------   Archivo adjunto <-    ---------------------   //

const input = document.querySelector('input[type="file"]')
var attachedDoc = [];
input.addEventListener('change', function(e){
    console.log(input.files)
    reader = new FileReader()
    reader.onload = function(){
        const imagen = new Image()
        imagen.src = reader.result
        document.body.appendChild(imagen)
        console.log(reader);
    },
    reader.readAsDataURL(input.files[0])
    console.log(reader)
}, false )

    /*
    const input = document.querySelector('input[type="file"]')
    function handleFiles (files) {
      console.log(files)
      const reader = new FileReader()
      reader.onload = function () {
        // const lines = reader.result.split('\n').map(function (line) {
        //   return line.split(',')
        // })
        // console.log(lines)
        const img = new Image()
        img.onload = function () {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          context.drawImage(img, 0, 0)
    
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          for (var i = 0; i <= data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = avg
            data[i + 1] = avg
            data[i + 2] = avg
          }
          context.putImageData(imageData, 0, 0)
    
          document.body.appendChild(canvas)
          //canvas.toDataURL()
          //const csvfile = new Blob(['one,two,three'], { type: 'text/csv' })
          canvas.toBlob(function (blob) {
            const form = new FormData()
            form.append('image', blob, 'moody.jpg')
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/imageupload', true)
            xhr.send(form)
          })
        }
        img.src = reader.result
        //document.body.appendChild(img)
      }
      //reader.readAsText(files[0])
      reader.readAsDataURL(files[0])
    }
    
    input.addEventListener('change', function (e) {
      handleFiles(input.files)
    }, false)
    
    document.addEventListener('dragover', function (e) {
      e.preventDefault()
      e.stopPropagation()
    }, false)
    document.addEventListener('drop', function (e) {
      e.preventDefault()
      e.stopPropagation()
      handleFiles(e.dataTransfer.files)
    }, false)
    */

    //  -----------------   Archivo adjunto ->    ---------------------   //


    // -----------  MAPS <- ----------------  //

    var marker = [];
    var directionsService = [];
    var directionsRenderer = [];

    var typeProtest = [];

    $('select#type-protest-select').on('change', function () {
        typeProtest = $(this).val();
        if (typeProtest == "huelga") {
            $("#all-map").addClass("d-none");
            $("#datepicker-protest").removeClass("d-none");
            $("#datepicker-protest-time").addClass("d-none");
        } else {
            $("#all-map").removeClass("d-none");
            $("#datepicker-protest").addClass("d-none");
            $("#datepicker-protest-time").removeClass("d-none");
        };
    });

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

            lat = marker.getPosition().lat();
            long = marker.getPosition().lng();

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                latLng: marker.getPosition()
            },
                function (result, status) {
                    if ("OK" === status) {
                        address = result[0].formatted_address;
                        resultArray = result[0].address_components;

                        for (var i = 0; i < resultArray.length; i++) {
                            if (
                                resultArray[i].types[0] &&
                                "administrative_area_level_2" === resultArray[i].types[0]
                            ) {
                                citi = resultArray[i].long_name;
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
                    if (infoWindow) {
                        infoWindow.close();
                    }

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

        var typeProtest = $("#type-protest-select").val();
        if ((typeProtest == "manifestacion") || (typeProtest == "protesta" && dataBaseWaypoint.length == 0)) {
            agregarWaypoint();
        } else {
            alert("No puede haber más de 1 punto en el mapa. Consideramos que una protesta solo se realiza en un sitio concreto y que no tiene recorrido.");
        }
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

        getWaypoint();
        arrangeId();
    }

    var dataBaseWaypoint = [];
    var getdataBaseWaypointRoute = [];

    function getWaypoint() {
        dataBaseWaypoint.push(waypts);
        getdataBaseWaypointRoute.push(wayptsLatLng);
        console.log(dataBaseWaypoint);
        console.log(getdataBaseWaypointRoute);
    }

    function getDataRoute() {
        getStartPoint = getdataBaseWaypointRoute[0];
        getEndPoint = getdataBaseWaypointRoute[getdataBaseWaypointRoute.length - 1];
        startPoint = getStartPoint.lat + ", " + getStartPoint.lng;
        endPoint = getEndPoint.lat + ", " + getEndPoint.lng;

        for (var i = 1; i < getdataBaseWaypointRoute.length - 1; i++) {
            getWaypoints = getdataBaseWaypointRoute[i].lat + ", " + getdataBaseWaypointRoute[i].lng;
            if (getdataBaseWaypointRoute[i]) {
                waypoints.push({
                    location: getWaypoints,
                    stopover: true
                });
            }
        }
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
        var ccc = id_line - 1;
        $("#" + id_line).remove();
        dataBaseWaypoint.splice(ccc, 1);
        getdataBaseWaypointRoute.splice(ccc, 1);
        arrangeId();
    }

    function arrangeId() {
        var num1 = 1;
        $("#table-map tbody tr").each(function () {
            $(this).eq(0).attr("id", num1);
            $(this).find("td").eq(0).text(num1);
            $(this).find("td").eq(1).attr("id", "dataMapAddress" + num1);
            $(this).find("td").eq(2).attr("id", "dataMapLat" + num1);
            $(this).find("td").eq(3).attr("id", "dataMapLong" + num1);

            num1++;

        });

        for (var i = 0; i < dataBaseWaypoint.length; i++) {
            Object.defineProperty(dataBaseWaypoint[i], "id", {
                value: i
            });
        };
    }

    function deleteAllLine() {
        $('.waypoint').remove();
        dataBaseWaypoint = [];
        getdataBaseWaypointRoute = [];
        directionsRenderer.setDirections({
            routes: []
        });
        arrangeId()
    }

    // -----------  MAPS -> ----------------  //

    protestsCreate.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('me diste un click')

        // ------------   Datos personales   --------------- //
        /*
function PersonalInformation(
    firstNameUser, 
    lastNameUser, 
    dniUser, 
    emailUser, 
    repeatEmailUser, 
    countryUser, 
    cityUser, 
    streetUser, 
    numberStreetUser, 
    phoneUser,
    postalCodeUser
){
    this.firstNameUser = firstNameUser;
    this.lastNameUser = lastNameUser;
    this.dniUser = dniUser;
    this.emailUser = emailUser;
    this.repeatEmailUser = repeatEmailUser;
    this.countryUser = countryUser;
    this.cityUser = cityUser;
    this.postalCodeUser = postalCodeUser;
    this.streetUser = streetUser;
    this.numberStreetUser = numberStreetUser;
    this.phoneUser = phoneUser;
}
var firstNameUser = document.getElementById("first-name").value;
console.log(firstNameUser);
var lastNameUser = document.getElementById("last-name").value;
console.log(lastNameUser);
var dniUser = document.getElementById("dni-user").value;
console.log(dniUser);
var emailUser = document.getElementById("email-user").value;
console.log(emailUser);
var repeatEmailUser = document.getElementById("repeat-email-user").value;
console.log(repeatEmailUser);
var countryUser = document.getElementById("country-select").value;
console.log(countryUser);
var cityUser = document.getElementById("city-select").value;
console.log(cityUser);
var postalCodeUser = document.getElementById("postal-code-user").value;
console.log(postalCodeUser);
var streetUser = document.getElementById("street-user").value;
console.log(streetUser);
var numberStreetUser = document.getElementById("number-street-user").value;
console.log(numberStreetUser);
var phoneUser = document.getElementById("phone-user").value;
console.log(phoneUser);
 
personalInformation = new PersonalInformation(
    firstNameUser,
    lastNameUser, 
    dniUser,
    emailUser,
    repeatEmailUser,
    countryUser,
    cityUser,
    postalCodeUser,
    streetUser,
    numberStreetUser,
    phoneUser
);
console.log(personalInformation);
*/
        // ------------   Datos personales.   --------------- //

        // ------------   Datos de la protesta   --------------- //

        function DataProtest(nameProtest, cityProtest, whoDefendsProtest, promotedByProtest, dateProtest) {
            this.name = nameProtest;
            this.city = cityProtest;
            this.whoDefends = whoDefendsProtest;
            this.promotedBy = promotedByProtest;
            this.date = dateProtest;
            // this.area = areaProtest1;
            // this.time = timeProtest1;
        }
        var countryProtestGet = document.getElementById("country-protest-select").value;
        console.log(countryProtestGet);
        var cityProtestGet = document.getElementById("city-protest-select").value;
        console.log(cityProtestGet);
        var dateProtestGet = document.getElementById("date-protest").value;
        console.log(dateProtestGet);
        var typeProtestGet = document.getElementById("type-protest-select").value;
        console.log(typeProtestGet);
        var initiatedProtestGet = document.getElementById("initiated-select").value;
        console.log(initiatedProtestGet);
        var defenseSectorProtestGet = document.getElementById("defense-sector-protest").value;
        console.log(defenseSectorProtestGet);
        var nameProtestGet = document.getElementById("name-protest").value;
        console.log(nameProtestGet);
        var tittleProtestLetterGet = document.getElementById("tittle-protest-letter").value;
        console.log(tittleProtestLetterGet);
        var bodyProtestLetterGet = document.getElementById("body-protest-letter").value;
        console.log(bodyProtestLetterGet);


        dataForm = new DataProtest(
            nameProtestGet,
            cityProtestGet,
            defenseSectorProtestGet,
            initiatedProtestGet,
            dateProtestGet
        );
        console.log(dataForm);
        // ------------   Datos de la protesta  --------------- //

        fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(dataForm)
        })
            //  console.log(newProtest);

            // tambien:    .then((resp) => resp.json())
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                return data;
            })

    });