//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

//  https://www.youtube.com/watch?v=1b4NzbSJ7dI&list=PLHAwr9gJjquel5iPqOXxPQkV2Dou6zddO&index=11
//  https://www.youtube.com/watch?v=mQ6kXrBqJcc
//  https://www.youtube.com/watch?v=29Dp2mSwS4w
//  https://www.youtube.com/watch?v=keO6egndYrE
//  https://www.youtube.com/watch?v=V5-pqK37pZg
//  https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/directions-waypoints
//  https://www.youtube.com/watch?v=-AR-6X_98rM




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
    reader.readAsDataURL(input.files[0]), // Esta es la clave para leer el formato
    attachedDoc.push(reader);
    console.log(reader);
    console.log(attachedDoc);
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
    if ((typeProtest == "MANIFESTACION") || (typeProtest == "PROTESTA" && dataBaseWaypoint.length == 0)) {
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
var pointLatWithComma = [];
var pointLong = $(".longitude").val();
var pointLongWithComma = [];
var pointAddress = $(".controls").val();
var idPointMap = '';
var isFirst = true;
var getWaypoints = [];
var startPoint = [];
var endPoint = [];
var waypoints = [];
var n = 0;

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

    pointLatWithComma = pointLat.replace(/["']/g, "");
    pointLongWithComma = pointLat.replace(/["']/g, "");
    console.log(pointLat);
    console.log(pointLong);

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

    function getDataWayptsLatLng(latitude, longitude, pointNumber) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.pointNumber = pointNumber;
    }
    getPointLatWithOutComma = Number(pointLat);
    getPointLongWithOutComma = Number(pointLong);

    dataWayptsLatLng = new getDataWayptsLatLng(getPointLatWithOutComma, getPointLongWithOutComma, n++);

    getWaypoint();
    arrangeId();
    getDataProtest();
}

var dataBaseWaypoint = [];

var dataAddressPoint = [];
var getDataAddress = [];
var dataAddress = [];
var dataAddressNumber = [];
var getAllZipCode = [];
var getZipCode = [];
var zipCode = [];
var dataArea = [];
var dataCity = [];
var dataCountry = [];
var dataAllWayPointPost = [];

var getdataBaseWaypointRoute = [];

function getWaypoint() {
    dataBaseWaypoint.push(waypts);
    getdataBaseWaypointRoute.push(wayptsLatLng);
    dataAllWayPointPost.push(dataWayptsLatLng);
    console.log(dataBaseWaypoint);
    console.log(getdataBaseWaypointRoute);
    console.log(dataAllWayPointPost);
}
function getDataProtest(){
    for ( i = 0 ; i < dataBaseWaypoint.length ; i++ ){
        dataAddressPoint = dataBaseWaypoint[0].address;
        getDataAddress = dataAddressPoint.split(",");
        getAllZipCode  = getDataAddress[2];
        getZipCode = getAllZipCode.split(" ");
        if(getDataAddress.length == 3){
            getAllZipCode  = getDataAddress[1];
            getZipCode = getAllZipCode.split(" ");

            dataAddress = getDataAddress[0];
            zipCode = getZipCode[1];
            dataArea = getZipCode[2];
            dataCity = dataArea;
            dataCountry = getDataAddress[2];
        } else if (getDataAddress.length == 4){
            getAllZipCode  = getDataAddress[2];
            getZipCode = getAllZipCode.split(" ");

            dataAddress = getDataAddress[0];
            dataAddressNumber = getDataAddress[1];
            zipCode = getZipCode[1];
            dataArea = getZipCode[2];
            dataCity = dataArea;
            dataCountry = getDataAddress[3];
        } else {
            var longAddress = getDataAddress.length
            getAllZipCode  = getDataAddress[longAddress - 3]
            getZipCode = getAllZipCode.split(" ");
            dataAddress = getDataAddress[0];
            dataAddressNumber = getDataAddress[1];
            zipCode = getZipCode[1];
            dataArea = getZipCode[2];
            dataCity = getDataAddress[3];
            dataCountry = getDataAddress[4];
        };
    };
};

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
    var ccc = id_line - 1;
    $("#" + id_line).remove();
    dataBaseWaypoint.splice(ccc, 1);
    getdataBaseWaypointRoute.splice(ccc, 1);
    dataAllWayPointPost.splice(ccc, 1)
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
    dataAllWayPointPost = [];
    directionsRenderer.setDirections({
        routes: []
    });
    arrangeId()
}

// -----------  MAPS -> ----------------  //

// -----------  POST <- ----------------  //

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')

    // ------------   Datos de la protesta   --------------- //

    function DataProtest(
        areaProtest,
        cityProtest,
        countryProtest,
        dateProtest,
        defenseSectorProtest,
        //  document,
        locationsProtest,
        monthProtest,
        nameProtest,
        promotedByProtest,
        protestType,
        timeProtest,
        userType
        ) {

        this.areaProtest = areaProtest,
        this.cityProtest = cityProtest,
        this.countryProtest = countryProtest,
        this.dateProtest = dateProtest,
        this.defenseSectorProtest = defenseSectorProtest,
        //  this.document = document,
        //  this.id = 0,
        this.locationsProtest = locationsProtest,
        this.monthProtest = monthProtest,
        this.nameProtest = nameProtest,
        this.promotedByProtest = promotedByProtest,
        this.protestType = protestType,
        this.timeProtest = timeProtest,
        this.userType = userType
    }
    function Token(Authorization) {
        this.Authorization = Authorization;
    }
    var dateProtestGet = document.getElementById("start-datepicker-protest").value;
    console.log(dateProtestGet);
    var timeProtestGet = document.getElementById("time-datepicker-protest").value;
    console.log(timeProtestGet);
    var typeProtestGet = document.getElementById("type-protest-select").value;
    console.log(typeProtestGet);
    var initiatedProtestGet = document.getElementById("initiated-select").value;
    console.log(initiatedProtestGet);
    var defenseSectorProtestGet = document.getElementById("defense-sector-protest").value;
    console.log(defenseSectorProtestGet);
    var nameProtestGet = document.getElementById("name-protest").value;
    console.log(nameProtestGet);
    var promotedByProtest = document.getElementById("promotedByProtest").value;
    console.log(promotedByProtest);
    //  var tittleProtestLetterGet = document.getElementById("tittle-protest-letter").value;
    //  console.log(tittleProtestLetterGet);
    //  var bodyProtestLetterGet = document.getElementById("protestLetter").value;
    //  console.log(bodyProtestLetterGet);
    var dateMonthProtestGet = dateProtestGet[3] + dateProtestGet[4];
    console.log(dateMonthProtestGet);
    var monthProtestGet = [];
    month();
    function month(){
        if(dateMonthProtestGet == 01){
            monthProtestGet = "Enero"
        }else if (dateMonthProtestGet == 02){
            monthProtestGet = "Febrero"
        }else if (dateMonthProtestGet == 03){
            monthProtestGet = "Marzo"
        }else if (dateMonthProtestGet == 04){
            monthProtestGet = "Abril"
        }else if (dateMonthProtestGet == 05){
            monthProtestGet = "Mayo"
        }else if (dateMonthProtestGet == 06){
            monthProtestGet = "Junio"
        }else if (dateMonthProtestGet == 07){
            monthProtestGet = "Julio"
        }else if (dateMonthProtestGet == 08){
            monthProtestGet = "Agosto"
        }else if (dateMonthProtestGet == 09){
            monthProtestGet = "Septiembre"
        }else if (dateMonthProtestGet == 10){
            monthProtestGet = "Octubre"
        }else if (dateMonthProtestGet == 11){
            monthProtestGet = "Noviembre"
        }else if (dateMonthProtestGet == 12){
            monthProtestGet = "Diciembre"
        }
        console.log(monthProtestGet);
    }
    

    var getToken = sessionStorage.getItem("token")
    console.log(getToken);
    console.log(sessionStorage);

    data = new DataProtest(
        dataArea,
        dataCity,
        dataCountry,
        dateProtestGet,
        defenseSectorProtestGet,
        dataAllWayPointPost,
        monthProtestGet,
        nameProtestGet,
        promotedByProtest,
        typeProtestGet,
        timeProtestGet,
        initiatedProtestGet
    );
    console.log(data);
    zzz = JSON.stringify(data);
    console.log(zzz);

    dataToken = new Token(
        `Bearer ` + getToken,
    );
    console.log(dataToken);
    // ------------   Datos de la protesta  --------------- //


    var urlCreate = "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create";
    var urlFile = "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/loadfile/";

    fetch(urlCreate, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + sessionStorage.token,
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(data)
    })
        // console.log(body);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
        })
        .then(function (data) {
            console.log(data)
            return data;
        })
    fetch(urlFile, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + sessionStorage.token,
            'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: attachedDoc
    })
        // console.log(body);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
        })
        .then(function (data) {
            console.log(data)
            return data;
        })

});

// -----------  POST -> ----------------  //