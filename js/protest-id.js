$(document).ready(function () {

    getPosts();

    
    var marker = [];
    var markerPoint = [];
    var directionsService = [];
    var directionsRenderer = [];


    var getStartPoint = [];
    var getEndPoint = [];
    var getWayPoints = [];
    var startPoint = [];
    var endPoint = [];
    var wayPoints = [];
    var allPoints = [];

 

    function initialize() {    
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

        marker = new google.maps.Marker({
            position: startPoint,
            map: map,
            draggable: true
        });
    
        directionsRenderer.setMap(map);        
    };
        

    


// -----------  GET <- ----------------  //


    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $('#errorModal').on('hidden.bs.modal', function () {
        window.location.href = "protest-id.html";
    });


    function getPosts(){
        var root = 'http://prueba-env.us-east-2.elasticbeanstalk.com/protests/';
        var protestId = sessionStorage.protesId;
        var url = root += protestId;
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            output += `
                <div class="row border-bottom" id="div-country-protestId">
                    <div class="col-6 h6">País en el que protesta:</div>
                    <div class="offset-1" id="data-country-protestId">${data.countryProtest}</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">La ciudad:</div>
                    <div class="offset-1" id="data-city-protestId">${data.cityProtest}</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">Tipo de protesta:</div>
                    <div class="offset-1" id="data-type-protestId">${data.protestType}</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">Temática de la protesta:</div>
                    <div class="offset-1" id="data-defenceSector-protestId">${data.defenseSectorProtest}</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">¿Qué es lo que defiende?:</div>
                    <div class="offset-1" id="data-name-defenceSector-protestId">${data.nameProtest}</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">Propuesto por:</div>
                    <div class="offset-1" id="data-date-protestId">${data.promotedByProtest}</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">Calle de reunión: </div>
                    <div class="offset-1" id="data-time-protestId">.......</div>
                </div>
                <div class="row border-bottom mt-4" id="div-country-protestId">
                    <div class="col-6 h6">Fecha y hora: </div>
                    <div class="offset-1" id="data-name-defenceSector-protestId">${data.dateProtest} / ${data.timeProtest}</div>
                </div>
            `;
            getOutput = String(output)
            console.log(getOutput)
            $('#output').html(getOutput);
            $('#title-letter-protestId').html(".......");
            $('#text-letter-protestId').html("........");
            $('#name-protest').html(`${data.nameProtest}`);

            var attachedDoc = data.document;
            var e = 0;
            $('#attached-protestId').html(`
                <h5 class="card-title">Documentos adjuntos</h5>
                <div id="` + e + `" class="row w-100" style="height: 100px;">` + attachedDoc + `</div>
            `);

            allPoints = data.locationsProtest;
            getDataRoute();
            function getDataRoute(){
                getStartPoint = allPoints.shift();
                getEndPoint = allPoints.pop();
                var getAllWaypoints = allPoints;
                startPoint = {
                    lat: getStartPoint.latitude,
                    lng: getStartPoint.longitude
                }
                endPoint = {
                    lat: getEndPoint.latitude,
                    lng: getEndPoint.longitude,
                }
                console.log(getAllWaypoints);

                console.log(allPoints);
                console.log(getStartPoint);
                console.log(getEndPoint);
                console.log(startPoint);
                console.log(endPoint);
                console.log(wayPoints);
                for (i = 0; i < getAllWaypoints.length; i++) {
                    getWaypoints = getAllWaypoints[i].latitude + ", " + getAllWaypoints[i].longitude;
                    if (getAllWaypoints[i]) {
                        wayPoints.push({
                            location: getWaypoints,
                            stopover: true
                        });
                    }
                };
                console.log(wayPoints);
                

                if(getEndPoint == ""){
                    initialize();
                }else {
                    initialize();
                    function initialize() {    
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
                
                        marker = new google.maps.Marker({
                            position: startPoint,
                            map: map,
                            draggable: true
                        });
                    
                        directionsRenderer.setMap(map);  
                        calculateAndDisplayRoute(directionsService, directionsRenderer)    
                    };
                    function calculateAndDisplayRoute(directionsService, directionsRenderer) {                    
                        directionsService.route({
                            origin: startPoint,
                            destination: endPoint,
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
                }
                

                

            };
            

            
        })
    }

    // conseguir el archivo desde la url correcta
/*
    function getPosts(){
        var root = 'http://prueba-env.us-east-2.elasticbeanstalk.com/protests/';
        var protestId = sessionStorage.protesId;
        var url = root += protestId;
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            var attachedDoc = data.document;
            var e = 0;
            $('#attached-protestId').html(`
                <h5 class="card-title">Documentos adjuntos</h5>
                <div id="` + e + `" class="row w-100" style="height: 100px;">` + attachedDoc + `</div>
            `);
        })
    }
*/

/*
    $.ajax({
        url: 'http://prueba-env.us-east-2.elasticbeanstalk.com/protests/91',
        method: 'GET',
        headers: dataToken,
        success: function (data) {
            $('#data-country-protestId').innerHTML(data.countryProtest);
            $('#data-city-protestId').innerHTML(data.cityProtest);
            $('#data-type-protestId').innerHTML(data.type);
            $('#data-city-protestId').innerHTML(data.city);
            $('#data-strike-protestId').innerHTML(data.strike);
            $('#data-defenceSector-protestId').innerHTML(data.defenseSectorProtest);
            $('#data-name-defenceSector-protestId').innerHTML(data.nameDefenceSector);
            $('#data-initiated-protestId').innerHTML(data.initiated);
            $('#data-name-initiated-protestId').innerHTML(data.nameInitiated);
            $('#data-date-protestId').innerHTML(data.dateProtest);
            $('#data-time-protestId').innerHTML(data.time);
            $('#title-letter-protestId').innerHTML(data.titleLetter);
            $('#text-letter-protestId').innerHTML(data.textLetter);
            $('#attached-protestId').innerHTML(data.attached);


        },
        error: function (jQXHR) {
            // If status code is 401, access token expired, so
            // redirect the user to the login page
            if (jQXHR.status == "401") {
                $('#errorModal').modal('show');
            }
            else {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        }
    });

*/

// -----------  GET -> ----------------  //

});