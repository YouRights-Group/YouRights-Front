//  https://www.youtube.com/watch?v=pq3-3ZmaMcI&list=PL6n9fhu94yhW7yoUOGNOfHurUE6bpOO2b&index=24
//  http://csharp-video-tutorials.blogspot.com/2016/12/aspnet-web-api-login-page.html

    var urlR = ('http://prueba-env.us-east-2.elasticbeanstalk.com/sign-up');
    var urlL = ('http://prueba-env.us-east-2.elasticbeanstalk.com/login');

    $("#register-submit").on("click", function (e) {
        e.preventDefault();
        console.log("register ok");

        var registerEmail = document.getElementById('register-email').value;
        var registerPassword1 = document.getElementById('register-password').value
        var registerPassword2 = document.getElementById('register-repeated-password').value;

        function DataRegister(registerEmail,registerPassword){
            this.Email = registerEmail;
            this.Password = registerPassword;
        };
        getDataRegister = new DataRegister(
            registerEmail,
            registerPassword1
        );

        $('#linkClose').click(function () {
            $('#divError').hide('fade');
        });

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
            .then(function (data) {
                console.log(data)
                return data;
            })
            console.log("Equal password")
            console.log(registerEmail);
            console.log(registerPassword1);
            console.log(registerPassword2);
        } else {
            $('#divErrorText').text("Las contraseñas no son iguales");
                $('#divError').show('fade');
        }


    });

    $("#login-submit").on("click", function (e) {
        e.preventDefault();
        console.log("login ok");

        var loginEmail = document.getElementById('login-email').value;
        var loginPassword = document.getElementById('login-password').value;

        function DataLogin(loginEmail,loginPassword){
            this.Email = loginEmail;
            this.Password = loginPassword;
        };
        getDataLogin = new DataLogin(
            loginEmail,
            loginPassword
        );

        $('#linkClose').click(function () {
            $('#divError').hide('fade');
        });

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
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data;
        })

        console.log(loginEmail);
        console.log(loginPassword);
    });
