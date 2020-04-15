//  https://www.youtube.com/watch?v=pq3-3ZmaMcI&list=PL6n9fhu94yhW7yoUOGNOfHurUE6bpOO2b&index=24
//  http://csharp-video-tutorials.blogspot.com/2016/12/aspnet-web-api-login-page.html

var urlS = ('http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up');
var urlL = ('http://prueba-env.us-east-2.elasticbeanstalk.com/login');
var urlR = ('http://prueba-env.us-east-2.elasticbeanstalk.com/regenerate_pwd');
var divError = $("#div-error");
var textError = $("#text_error");

var bbb = sessionStorage.token;
console.log(bbb)
console.log(sessionStorage)

// Esto implementa el catchap que debemos poner en el registro
grecaptcha.ready(function() {
    grecaptcha.execute('6LcvuekUAAAAAMkkTSksWDcHg4eh0i6bFv7BHL6w', {action: 'homepage'}).then(function(token) {

    });
});


$("#register-submit").on("click", function (e) {
    e.preventDefault();
    console.log("register ok");

    var registerEmail = document.getElementById('register-email').value;
    var registerPassword1 = document.getElementById('register-password').value
    var registerPassword2 = document.getElementById('register-repeated-password').value;

    function DataRegister(registerEmail, registerPassword) {
        this.email = registerEmail;
        this.password = registerPassword;
    };
    getDataRegister = new DataRegister(
        registerEmail,
        registerPassword1
    );

    console.log(getDataRegister)
    if (registerPassword1 == registerPassword2) {
        //    Hay que ver si en la respuesta se registra el token, ahora mismo la respuesta esta vacia
        /*
    $.ajax({
        url: 'http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up',
        method: 'POST',
        data: JSON.stringify(getDataRegister),
        contentType: "application/json",
        success: function (data) {
            console.log(data)
        },
        error: function (jqXHR) {
            console.log(jqXHR)
        }
    });

    console.log(getDataRegister);
    }
    */
        fetch(urlS, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(getDataRegister), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(function (error) {
                console.log(error)
            })
            .then(function (response) {
                console.log(response)

                var bntInsertProtest = sessionStorage.getItem('bntInsertProtest');

                if (response.type) {
                    divError.modal();
                    textError.html(response.error);
                } else if (response.token) {
                    if (bntInsertProtest === "click") {
                        window.location.href = "insert-protest.html";
                        sessionStorage.removeItem('bntInsertProtest');
                        sessionStorage.setItem('token', response.token);
                        sessionStorage.setItem('email', registerEmail);
                    } else {
                        window.location.href = "page-main.html";
                        sessionStorage.setItem('token', response.token);
                        sessionStorage.setItem('email', registerEmail);
                    }
                } else {
                    divError.modal();
                    textError.html("Se ha producido un error inesperado, por favor, vuelve a intentarlo");
                }
            })

    }
});

$("#login-submit").on("click", function (e) {
    e.preventDefault();
    console.log("login ok");

    var loginEmail = document.getElementById('login-email').value;
    var loginPassword = document.getElementById('login-password').value;


    function DataLogin(loginEmail, loginPassword) {
        this.email = loginEmail;
        this.password = loginPassword;
    };
    getDataLogin = new DataLogin(
        loginEmail,
        loginPassword
    );

    fetch(urlL, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(getDataLogin), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(function (error) {
            console.log(error)
        })
        .then(function (response) {

            var responseType = [];
            var errorCode = [];
            var errorCodeNotice = [];
            var bntInsertProtest = sessionStorage.getItem('bntInsertProtest');

            responseType = response.type;
            errorCode = response.code;
            errorCodeNotice = response.error;
            console.log(responseType);
            console.log(errorCode);
            console.log(errorCodeNotice);

            if (responseType === "error") {
                divError.modal();
                textError.html(errorCodeNotice);
            } else if (response.token) {
                if (bntInsertProtest === "click") {
                    window.location.href = "insert-protest.html";
                    sessionStorage.removeItem('bntInsertProtest');
                    sessionStorage.setItem('token', response.token);
                    sessionStorage.setItem('email', loginEmail);
                } else {
                    window.location.href = "page-main.html";
                    sessionStorage.setItem('token', response.token);
                    sessionStorage.setItem('email', loginEmail);
                }
            } else {
                divError.modal();
                textError.html("Se ha producido un error inesperado, por favor, vuelve a intentarlo");
            }
        })

    /**
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
     */
    console.log(getDataLogin);
});

// No esta probado
$("#regenerate-submit").on("click", function (e) {
    e.preventDefault();
    console.log("regenerate ok");

    var regeneratePassword1 = document.getElementById('regenerate-password1').value
    var regeneratePassword2 = document.getElementById('regenerate-password2').value;

    function DataRegister(regeneratePassword1, regenerateToken) {
        this.password = regeneratePassword1;
        this.token = regenerateToken;
    };
    getDataRegenerate = new DataRegister(
        regeneratePassword1,
        sessionStorage.token
    );


    if (regeneratePassword1 == regeneratePassword2) {
        fetch(urlR, {
                method: 'POST',
                body: JSON.stringify(getDataRegenerate),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            .then(res => res.json())
            .catch(function (error) {
                console.log(error)
            })
            .then(function (response) {


                if (response.type) {
                    divError.modal();
                    textError.html(response.error);
                } else if (response == null) {
                        window.location.href = "index.html";
                } else {
                    divError.modal();
                    textError.html("Se ha producido un error inesperado, por favor, vuelve a intentarlo");
                }
            })


    }

});