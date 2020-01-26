//  https://www.youtube.com/watch?v=pq3-3ZmaMcI&list=PL6n9fhu94yhW7yoUOGNOfHurUE6bpOO2b&index=24
//  http://csharp-video-tutorials.blogspot.com/2016/12/aspnet-web-api-login-page.html

var registerEmail = $('#register-email').val();
var registerPassword1 = $('#register-password').val();
var registerPassword2 = $('#register-repeated-password').val();
var loginEmail = $('#login-email').val();
var loginPassword = $('#login-password').val();
var urlR = ('http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up');
var urlL = ('http://prueba-env.us-east-2.elasticbeanstalk.com/login');

$("#register-submit").on("click", function () {
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });
    $('#register-submit').click(function () {
        $.ajax({
            url: urlR,
            method: 'POST',
            data: {
                email: registerEmail,
                password: registerPassword1,
                confirmPassword: registerPassword2
            },
            success: function () {
                // $('#successModal').modal('show');
                sessionStorage.setItem("token", response.access_token);
                window.location.href = "page-main.html";
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    });
});

$("#login-submit").on("click", function () {
    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });
    $('#btnLogin').click(function () {
        $.ajax({
            // Post username, password & the grant type to /token
            url: urlL,
            method: 'POST',
            contentType: 'application/json',
            data: {
                username: loginEmail,
                password: loginPassword,
                grant_type: 'password'
            },
            // When the request completes successfully, save the
            // access token in the browser session storage and
            // redirect the user to Data.html page. We do not have
            // this page yet. So please add it to the
            // EmployeeService project before running it
            success: function (response) {
                sessionStorage.setItem("token", response.access_token);
                window.location.href = "page-main.html";
            },
            // Display errors if any in the Bootstrap alert <div>
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
    });
});