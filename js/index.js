$(document).ready(function () {
    /*
    $('.fj-date').datepicker({
        format: "dd/mm/yyyy",
        language: 'es',
    });
    */
    $('#account-bank').click(function () {
        $("#modal-account-bank").modal();
    });
    $(document).ready(function () {
        $("#modal-notice").modal();
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


    
});
$('about-as').ready(function () {
    //para que los videos tengan el estilo y la dependencia de Videojs.com
    Video();
    function Video() {
        var reproductor = videojs('fm-video', {
            fluid: true
        });
    };
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

// para redimensionar la hoja de transparencia. NO FUNCIONA
$(document).ready(function () {
    var aaa = screen.width;
    if(aaa < 1000){
        $("#transparency-notice").css("height", "1500px")
        $("#transparency-footer").css("margin-top", "640px")
    }
    
});

$(document).ready(function () {
    var widthScreen = $(document).width();
    console.log(widthScreen)
    if(widthScreen < 400){
        $("#section-planner").addClass("mt-5")
        $("#img-service-planner").addClass("d-none")
        // filtro del mapa principal
        $("#collapsingNavbar4").addClass("collapse")
        $("#filter-map-main").removeClass("d-none")
        $("#filter-map-main").css("top", "100px")
        $("#aaa").css("top", "150px")
        // cartas de publicidad event-planner
        $("#div-card-deck-advertisement").removeClass("container")
        $("#div-card-deck-advertisement").addClass("col")
        // barra de navegación principal
        $("#nav1").removeClass("w-75 justify-content-center mx-auto")
        $("#nav1").addClass("w-100")
        $("#navbar-toggler").css("right", "0px")
        // impunts de la pantalla del login
        $("#login-div-input").addClass("w-100")
        // cajas del formulario de insert protest
        $("#form-insert-div div").removeClass("col")
        $("#form-insert-div div").addClass("col-md-4")
        $("#div-button-insert-map #rutear").removeClass("float-right")
        $("#div-button-insert-map #rutear").addClass("mt-2")
        $("#div-button-insert-map ").addClass("text-center")

    }else if(widthScreen < 770 ){
        // cajas del formulario de insert protest
        $("#form-insert-div div").removeClass("col")
        $("#form-insert-div div").addClass("col-md-4")
    }else if(widthScreen < 1150 ){
        // filtro del mapa principal
        $("#collapsingNavbar4").addClass("collapse")
        $("#filter-map-main").removeClass("d-none")
        $("#filter-map-main").css("top", "200px")
        $("#aaa").css("top", "250px")
        // cartas de publicidad event-planner
        $("#div-card-deck-advertisement").removeClass("container")
        $("#div-card-deck-advertisement").addClass("col")
    } else if(widthScreen < 1200 ){
        // barra de navegación principal
        console.log("hola")
        $("#nav1").removeClass("justify-content-center")
        $("#navbar-toggler").css("right", "0px")
    } else {
        $("#section-planner").removeClass("mt-5")
        $("#img-service-planner").removeClass("d-none")
    }
});
$(document).ready(function () {
    var widthScreen = $(document).width();
    if(widthScreen < 400){
        $("#div-detail-protest").removeClass("justify-content-center")
        $("#div-detail-protest").css("height", "900px")
        $("#map_canvas").css("height", "350px")
    } else if(widthScreen < 992 ){
        // cajas del formulario de insert protest
        $("#div-button-insert-map #rutear").removeClass("float-right")
        $("#div-button-insert-map #rutear").addClass("mt-2")
        $("#div-button-insert-map ").addClass("text-center")
    }else if(widthScreen < 1200 ){
        // barra de navegación principal
        $("#nav1").removeClass("justify-content-center")
        $("#navbar-toggler").css("right", "0px")
    }
});



navOpen();
function navOpen() {
    var showNav = $(".navbar-collapse").hasClass("show");
    if(showNav === false){
        $("#collapsingNavbar3").removeClass("bg-white border rounded")
    }
    $("#navbar-toggler").on("click", function () {
            var aaa = $("#nav-main").hasClass("position-fixed");
            if(showNav === true){
                $("#collapsingNavbar3").removeClass("bg-white border rounded")
            }else if(showNav === false){
                $("#collapsingNavbar3").addClass("bg-white border rounded")
            }else if (showNav === true && aaa === true) {// no funciona
                console.log("hola")
                $("#collapsingNavbar3").removeClass("bg-white border rounded")
            }      
    })
};

/*
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


--------------
navOpen();
function navOpen() {
    $(document).click(function (event) {
        if ($(event.target).parents(".navbar-collapse").length < 1) {
            var clickover = $(event.target);
            var $navbar = $(".navbar-collapse");
            var _opened = $navbar.hasClass("show");
            if(_opened === true){
                console.log("esta abierto")
                $("#ul-collapse").removeClass("pl-3 pb-2 pr-3 border rounded bg-white")
            }else if(_opened === false){
                console.log("esta cerrado");
                $("#ul-collapse").addClass("pl-3 pb-2 pr-3 border rounded bg-white")
            }else if (_opened === true && clickover.hasClass("navbar-toggle")) {
                $navbar.collapse('hide');
                $navbar.removeClass("pl-3 pb-2 pr-3 border rounded bg-white")
                $("#ul-collapse").removeClass("pl-3 pb-2 pr-3 border rounded bg-white")
            }
            
        }
    })
};


*/


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
$('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
}).on('hidden.bs.collapse', function () {
    $(this).parent().find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
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