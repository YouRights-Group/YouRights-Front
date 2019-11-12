//  https://www.youtube.com/watch?v=Zxf1mnP5zcw&t=10s
$(document).ready(function () {

    initMap();

    function initMap() {
        // Map options
        var options = {
            zoom: 5,
            center: {
                lat: 40.42928819958918,
                lng: -3.6999707343627506
            }
        }

        // New map
        var map = new google.maps.Map(document.getElementById('map'), options);

        // Listen for click on map
        google.maps.event.addListener(map, 'click', function (event) {
            // Add marker
            addMarker({
                coords: event.latLng
            });
        });

        /*
        // Add marker
        var marker = new google.maps.Marker({
          position:{lat:42.4668,lng:-70.9495},
          map:map,
          icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
  
        var infoWindow = new google.maps.InfoWindow({
          content:'<h1>Lynn MA</h1>'
        });
  
        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
        */

        // Array of markers
        var markers = [{
                coords: {
                    lat: 40.42928819958918,
                    lng: -3.6999707343627506
                },
                iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                content: '<h1>Lynn MA</h1>'
            },
            {
                coords: {
                    lat: 40.43978819958918,
                    lng: -3.6999707343627506
                },
                content: '<h1>Amesbury MA</h1>'
            },
        ];

        // Loop through markers
        for (var i = 0; i < markers.length; i++) {
            // Add marker
            addMarker(markers[i]);
        }
        
        // Add Marker Function
        function addMarker(props) {
            var marker = new google.maps.Marker({
                position: props.coords,
                map: map,
                //icon:props.iconImage
            });

            // Check for customicon
            if (props.iconImage) {
                // Set icon image
                marker.setIcon(props.iconImage);
            }

            // Check content
            if (props.content) {
                var infoWindow = new google.maps.InfoWindow({
                    content: props.content
                });

                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
            }
        }
    }
});