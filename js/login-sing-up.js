//  https://www.youtube.com/watch?v=pq3-3ZmaMcI&list=PL6n9fhu94yhW7yoUOGNOfHurUE6bpOO2b&index=24
//  http://csharp-video-tutorials.blogspot.com/2016/12/aspnet-web-api-login-page.html

var urlR = ('http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up');
var urlL = ('http://prueba-env.us-east-2.elasticbeanstalk.com/login');
var divError =  $("#div-error");
var textError = $('#text-error');

$("#register-submit").on("click", function (e) {
    e.preventDefault();
    console.log("register ok");

    var registerEmail = document.getElementById('register-email').value;
    var registerPassword1 = document.getElementById('register-password').value
    var registerPassword2 = document.getElementById('register-repeated-password').value;

    function DataRegister(registerEmail,registerPassword){
        this.email = registerEmail;
        this.password = registerPassword;
    };
    getDataRegister = new DataRegister(
        registerEmail,
        registerPassword1
    );


    if (registerPassword1 == registerPassword2){
        fetch(urlR, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(getDataRegister)
        })
        //  console.log(newProtest);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            $(divError).modal();
            $(textError).html('Te enviaremos un email para que confirmes la cuenta')

        })
        console.log(getDataRegister);
    } else {
        $(divError).modal();
        $(textError).html('Las contraseñas no coinciden')
    }


});

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

    fetch(urlL, {
        method: 'POST',
        headers: [
            ["Content-Type", "application/json"]
        ],
        body: JSON.stringify(getDataLogin)
    })
    //  console.log(newProtest);

    // tambien:    .then((resp) => resp.json())
    .then(function (response) {
        //  var token = response.json();
        //  console.log(token);
        sessionStorage.setItem("token", response.json ());
        console.log(sessionStorage);
        window.location.href = "page-main.html";
        console.log(response);
        // location.href="page-main.html";
    })
    .then(function () {
        //  console.log(data)
        //  return data;
        //  location.href="page-main.html";
    })

    console.log(getDataLogin);
});

$("#regenerate-submit").on("click", function (e) {
    e.preventDefault();
    console.log("regenerate ok");

    var regeneratePassword1 = document.getElementById('regenerate-password1').value
    var regeneratePassword2 = document.getElementById('regenerate-password2').value;

    function DataRegister(regeneratePassword1,regenerateToken){
        this.password = regeneratePassword1;
        this.token = regenerateToken;
    };
    getDataRegenerate = new DataRegister(
        regeneratePassword1,
        tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
    );


    if (regeneratePassword1 == regeneratePassword2){
        fetch(urlR, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(getDataRegenerate)
        })
        //  console.log(newProtest);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data;
        })
        console.log(getDataRegenerate);
    } else {
    }


});
