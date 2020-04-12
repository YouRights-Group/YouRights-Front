//  https://www.youtube.com/watch?v=pq3-3ZmaMcI&list=PL6n9fhu94yhW7yoUOGNOfHurUE6bpOO2b&index=24
//  http://csharp-video-tutorials.blogspot.com/2016/12/aspnet-web-api-login-page.html

var urlR = ('http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up');
var urlL = ('http://prueba-env.us-east-2.elasticbeanstalk.com/login');
var divError =  $("#div-error");
var textError = $("#text_error");
var bntInsertProtest = sessionStorage.getItem('bntInsertProtest');
console.log(sessionStorage)


$("#login-submit").on("click", function (e) {
    e.preventDefault();
    console.log("login ok");

    var loginEmail = document.getElementById('login-email').value;
    var loginPassword = document.getElementById('login-password').value;


    function DataLogin(loginEmail,loginPassword){
        this.email = loginEmail;
        this.password = loginPassword;
    };
    getDataLogin = new DataLogin(
        loginEmail,
        loginPassword
    );


    $.ajax({
        // la URL para la petición
        url : "http://prueba-env.us-east-2.elasticbeanstalk.com/login",
    
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data :  JSON.stringify(getDataLogin),
    
        // especifica si será una petición POST o GET
        type : 'POST',
        contentType: "application/json",
    
        // el tipo de información que se espera de respuesta
        dataType : 'json',
    
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(json) {
            $('<h1/>').text(json.title).appendTo('body');
            $('<div class="content"/>').html(json.html).appendTo('body');
            console.log(json)
        },
    
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(response) {
            alert('Disculpe, existió un problema');
            console.log(response)
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    });

    console.log(getDataLogin);
});
