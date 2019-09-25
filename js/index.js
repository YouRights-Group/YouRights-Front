
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

// Para fijar el nav cuando se hace scroll 
$(window).scroll(function(){
    $('#nav-main').toggleClass('position-fixed bg-white nav-style', $(this).scrollTop() > 200);
});

$(document).ready(function() {
    // Para que aparezca o desaparezca el boton de archivar adjunto en el formulario de insertar protesta, no funciona bien!!!!!!!!!!!!
    function attachedDoc() {
        console.log("estassss");
        var attached = $( "#type-protest-select" ).val(1) || [];
        // When using jQuery 3:
        // var multipleValues = $( "#multiple" ).val();
        $( "#attached-doc" ).removeClass( "d-none" ).addClass( "d-block" );
        console.log("estassss");
    }
});

// Para cambiar el icono del accordion cuando esta desplegado, FUNCIONA
$( ".accordion" ).click(function() {
    $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
  });





// Para que aparezca en el el registro ambos formularios, FUNCIONA
$(document).ready(function() {
    $("#sing-up-or-login").click(function() {
        if (this.checked) {
            $( ".login-form" ).addClass( "d-none" );
            $( ".sing-up-form" ).removeClass("d-none");
        } else {
            $( ".sing-up-form" ).addClass( "d-none" );
            $( ".login-form" ).removeClass("d-none");
        }
    });
});