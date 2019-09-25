
$(document).ready(function() {

    $('.fj-date').datepicker({
        format: "dd/mm/yyyy",
        language: 'es',
    });

    $("#map-click").on("click",function(){
        $("#modal-map").modal(console.log("Hello world!"));
        $('#map-city').append('Poner aquí (Ciudad, País)')
        $('#modal-body-map').append('<h5><strong>Cantidad de protestas: </strong></h5>')
        $('#modal-body-map').append('<h5><strong>En defensa de: </strong></h5>')
        
    });

    console.log("Hello world!");
});

$(window).scroll(function(){
    $('#nav-main').toggleClass('scrolled', $(this).scrollTop() > 50);
    $( "#nav-main" ).removeClass( "position-absolute" ).addClass( "position-fixed nav-style" );
});