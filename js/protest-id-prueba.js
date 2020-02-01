$(document).ready(function () {

    var marker = [];
    var directionsService = [];
    var directionsRenderer = [];

    var typeProtest = [];
    initialize();

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

        calculateAndDisplayRoute(directionsService, directionsRenderer);
    }



    function calculateAndDisplayRoute(directionsService, directionsRenderer) {    
        directionsService.route({
            origin: data.startPoint,
            destination: data.endPoint,
            waypoints: data.waypoint,
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
    };


// -----------  GET <- ----------------  //

    function Token(Authorization) {
        this.Authorization = Authorization;
    }

    var getToken = sessionStorage.getItem("token")
    console.log(getToken);

    dataToken = new Token(
        `Bearer` + getToken,
    );
    console.log(dataToken);

    if (sessionStorage.getItem('token') == null) {
        window.location.href = "protest-id.html";
    }

    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $('#errorModal').on('hidden.bs.modal', function () {
        window.location.href = "protest-id.html";
    });

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

// -----------  GET -> ----------------  //

});