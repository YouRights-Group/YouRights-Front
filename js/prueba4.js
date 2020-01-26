//  https://www.youtube.com/watch?v=pq3-3ZmaMcI&list=PL6n9fhu94yhW7yoUOGNOfHurUE6bpOO2b&index=24
//  http://csharp-video-tutorials.blogspot.com/2016/12/aspnet-web-api-login-page.html

var registerEmail = $('#register-email').val();
var registerPassword1 = $('#register-password').val();
var registerPassword2 = $('#register-repeated-password').val();
var loginEmail = $('#login-email').val();
var loginPassword = $('#login-password').val();
var urlR = ('http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up');
var urlL = ('http://prueba-env.us-east-2.elasticbeanstalk.com/login');

function DataRegister(registerEmail,registerPassword){
    this.registerEmail = registerEmail;
    this.registerPassword = registerPassword;
};
function DataLogin(loginEmail,loginPassword){
    this.loginEmail = loginEmail;
    this.loginPassword = loginPassword;
};
getDataRegister = new DataRegister(
    registerEmail,
    registerPassword1
);
getDataLogin = new DataLogin(
    loginEmail,
    loginPassword
);

$("#register-submit").on("click", function () {
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });
    if (registerPassword1 == registerPassword2){
        console.log("Equal password")
        $.ajax({
            url: urlR,
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            data: {
                email: registerEmail,
                password: registerPassword1
            },
            success: function () {
                console.log("registro  okkkkk")
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    } else {
        $('#divErrorText').text("Las contraseñas no son iguales");
            $('#divError').show('fade');
    }
});

$("#login-submit").on("click", function () {
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });
    $.ajax({
        url: urlL,
        method: 'POST',
        headers: [
            ["Content-Type", "application/json"]
        ],
        data: {
            username: loginEmail,
            password: loginPassword,
        },
        success: function () {
            console.log("login okkkk")
        },
        // Display errors if any in the Bootstrap alert <div>
        error: function (jqXHR) {
            $('#divErrorText').text(jqXHR.responseText);
            $('#divError').show('fade');
        }
    });
});