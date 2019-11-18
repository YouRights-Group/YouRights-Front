//  https://www.youtube.com/watch?v=1b4NzbSJ7dI&list=PLHAwr9gJjquel5iPqOXxPQkV2Dou6zddO&index=11
//  https://www.youtube.com/watch?v=mQ6kXrBqJcc


var geocoder;
var map;
var marker;

var marcadores_nuevos = [];

function quitar_marcadores(lista){
    // recorrer el array de los marcadores
    for (i in lista){
        lista[i].setMap(null);
    }
};

/*
 * Google Map with marker
 */
function initialize() {
    var initialLat = $('.search_latitude').val();
    var initialLong = $('.search_longitude').val();
    initialLat = initialLat?initialLat:36.169648;
    initialLong = initialLong?initialLong:-115.141000;

    var latlng = new google.maps.LatLng(initialLat, initialLong);
    var options = {
        zoom: 16,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("geomap"), options);

    geocoder = new google.maps.Geocoder();
    

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: latlng,
        animation: google.maps.Animation.DROP,
        draggble: false // no permite el arrastre del marcador
    });


    google.maps.event.addListener(marker, "dragend", function () {
        var point = marker.getPosition();
        map.panTo(point);
        geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                $('.search_addr').val(results[0].formatted_address);
                $('.search_latitude').val(marker.getPosition().lat());
                $('.search_longitude').val(marker.getPosition().lng());
            }
        });
    });

}

$(document).ready(function () {
    //load google map
    initialize();
    
    /*
     * autocomplete location search
     */
    var PostCodeid = '#search_location';
    $(function () {
        $(PostCodeid).autocomplete({
            source: 
            function (request, response) {
                geocoder.geocode({
                    'address': request.term
                }, 
                function (results, status) {
                    response($.map(results, function (item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            lat: item.geometry.location.lat(),
                            lon: item.geometry.location.lng()
                        };
                    }));
                });
            },
            select: function (event, ui) {
                $('.search_addr').val(ui.item.value);
                $('.search_latitude').val(ui.item.lat);
                $('.search_longitude').val(ui.item.lon);
                var latlng = new google.maps.LatLng(ui.item.lat, ui.item.lon);
                marker.setPosition(latlng);
                initialize();
            }
        });
    });
    
    /*
     * Point location on google map
     */
    $('.get_map').click(function (e) {
        var address = $(PostCodeid).val();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                $('.search_addr').val(results[0].formatted_address);
                $('.search_latitude').val(marker.getPosition().lat());
                $('.search_longitude').val(marker.getPosition().lng());
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        e.preventDefault();
    });

    //Add listener to marker for reverse geocoding
    google.maps.event.addListener(marker, 'drag', function () {
        geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('.search_addr').val(results[0].formatted_address);
                    $('.search_latitude').val(marker.getPosition().lat());
                    $('.search_longitude').val(marker.getPosition().lng());
                }
            }
        });
    });

    google.maps.event.addListener(map, 'click', function (event) {

        
        // alert(event.latLng)
        var coordenadas = event.latLng.toString();

        coordenadas = coordenadas.replace("(","");
        coordenadas = coordenadas.replace(")","");
        var lista = coordenadas.split(",");

        // alert("La coordenada X es: " + lista [0]);
        // alert("La coordenada Y es: " + lista [1]);

        var latlng = new google.maps.LatLng(lista[0],lista[1]);
        
        var marcador = new google.maps.Marker({
            // titulo: prompt("Titulo del marcador?"),
            position: latlng,
            map: map,
            animation: google.maps.Animation.DROP,
            draggble: false, // no permite el arrastre del marcador
        });

        // pasar coordenadas al formulario
        // $("#form-protests-create-map").find("input[name='cx']").val(lista[0]);
        // $("#form-protests-create-map").find("input[name='cx']").val(lista[1]);
        


        var cxMap = $(".search_latitude").val(lista[0]);
        var cyMap = $(".search_longitude").val(lista[1]);

        marcadores_nuevos.push(marcador);

        google.maps.event.addListener(marcador, "click", function(){
            // alert(marcador.titulo);
        });

        quitar_marcadores(marcadores_nuevos);
        marker.setPosition(latlng);
    });
});