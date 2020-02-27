$(document).ready(function () {
    /*
    $('.fj-date').datepicker({
        format: "dd/mm/yyyy",
        language: 'es',
    });
    */
    $('#account-bank').click(function () {
        $("#modal-account-bank").modal();
        console.log("hola");
    });
    $('.date-datepicker').datetimepicker({
        timepicker: false,
        format: 'd-m-Y'
    });

    $('.time-datepicker').datetimepicker({
        step: 10,
        datepicker: false,
        format: 'H:i'
    });

    $("#map-click").on("click", function () {
        $("#modal-map").modal();
        $('#map-city').append('Poner aquí (Ciudad, País)')
        $('#modal-body-map').append('<h5><strong>Cantidad de protestas: </strong></h5>')
        $('#modal-body-map').append('<h5><strong>En defensa de: </strong></h5>')

    });

    $("#btn-sing-up").removeClass("btn-outline-info");
    $("#btn-sing-up").addClass("btn-info");
    $("#delete-datepicker").on("click", function () {
        $('#start-datepicker').val('');
        $('#end-datepicker').val('');
    });


    console.log("Hello world!");
});

// Para fijar el nav cuando se hace scroll 
$(window).scroll(function () {
    $('#nav-main').toggleClass('position-fixed bg-white nav-style', $(this).scrollTop() > 200);
});
// Para fijar el nav cuando se hace scroll, en la pagina protest-id.html, NO FUNCIONA
$(window).scroll(function () {
    var scrollNav = document.createElement("div");
    scrollNav.setAttribute("id", "nav-scroll");
    $('#nav-scroll').addClass('col w-100 position-fixed bg-white nav-style', $(this).scrollTop() > 200);
    $('#nav-main2').append(scrollNav);
    console.log("#nav-scroll")
});

/*
navOpen();
function navOpen() {
    $(document).click(function (event) {
        if ($(event.target).parents(".navbar-collapse").length < 1) {
            var clickover = $(event.target);
            var $navbar = $(".navbar-collapse");
            var _opened = $navbar.hasClass("show");
            if(_opened === true){
                console.log("esta abierto")
                $("#ul-collapse").addClass("pl-3 pb-2 pr-3 border rounded bg-white")
            }else if(_opened === false){
                console.log("esta cerrado");
                $("#ul-collapse").addClass("pl-3 pb-2 pr-3 border rounded bg-white")
            }else if (_opened === true && !clickover.hasClass("navbar-toggle")) {
                $navbar.collapse('hide');
                $navbar.removeClass("pl-3 pb-2 pr-3 border rounded bg-white")
            }
            
        }
    })
};
*/

$(document).click(function (event) {
    if ($(event.target).parents(".navbar-collapse").length < 1) {
        var clickover = $(event.target);
        var $navbar = $(".navbar-collapse");
        var _opened = $navbar.hasClass("in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $navbar.collapse('hide');
        }
        
    }
});



$(document).ready(function () {
    // Para que aparezca o desaparezca el boton de archivar adjunto en el formulario de insertar protesta, no funciona bien!!!!!!!!!!!!
    function attachedDoc() {
        console.log("estassss");
        var attached = $("#type-protest-select").val(1) || [];
        // When using jQuery 3:
        // var multipleValues = $( "#multiple" ).val();
        $("#attached-doc").removeClass("d-none").addClass("d-block");
        console.log("estassss");
    }
});

// Para cambiar el icono del accordion cuando esta desplegado, FUNCIONA
$(".accordion").click(function () {
    $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
});





// Para que aparezca en el el registro ambos formularios, FUNCIONA
$(document).ready(function () {
    $("#sing-up-or-login").click(function () {
        if (this.checked) {
            $(".login-form").addClass("d-none");
            $(".sing-up-form").removeClass("d-none");
        } else {
            $(".sing-up-form").addClass("d-none");
            $(".login-form").removeClass("d-none");
        }
    });
    $('#forgot-password').click(function () {
        if (this.checked) {
            $("#repeat-email-forgot").removeClass("d-none");
            $(".hide").hide(1000, "swing");
            $('#login-submit').text("Enviar email de recordatorio");
        } else {
            $("#repeat-email-forgot").addClass("d-none");
            $(".hide").show(1000, "swing");
            $('#login-submit').text("Pulsa para entrar");
        }
    });
});