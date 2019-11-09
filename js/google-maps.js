//  https://www.youtube.com/watch?v=Zxf1mnP5zcw&t=10s

$(document).ready(function(){

    function initMaps(){
        var point = {
            zoom:8,
            center:{lat:40.4163737, lng:-3.6987978}
        }
        var map = new
        google.maps.Map($('#map'), point);

        var marker = new google.maps.Marker({
            position:{lat:40.4163737, lng:-3.6987978},
            map:map,
        });
    };

});