
// -----------  POST <- ----------------  //

const protestsCreate = document.getElementById('form-protests-create');
console.log(sessionStorage)

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')

    // ------------   Datos de la protesta   --------------- //

    function DataProtest(
        areaProtest,
        cityProtest,
        countryProtest,
        dateProtest,
        defenseSectorProtest,
        //  document,
        //  locationsProtest,
        //  monthProtest,
        nameProtest,
        promotedByProtest,
        protestType,
        timeProtest,
        userType
    ) {

        this.areaProtest = areaProtest,
            this.cityProtest = cityProtest,
            this.countryProtest = countryProtest,
            this.dateProtest = dateProtest,
            this.defenseSectorProtest = defenseSectorProtest,
            //  this.document = document,
            //  this.id = 0,
            //  this.locationsProtest = locationsProtest,
            //  this.monthProtest = monthProtest,
            this.nameProtest = nameProtest,
            this.promotedByProtest = promotedByProtest,
            this.protestType = protestType,
            this.timeProtest = timeProtest,
            this.userType = userType
    }

    function Token(Authorization) {
        this.Authorization = Authorization;
    }
    var dateProtestGet = document.getElementById("start-datepicker-protest").value;
    console.log(dateProtestGet);
    var timeProtestGet = document.getElementById("time-datepicker-protest").value;
    console.log(timeProtestGet);
    var typeProtestGet = document.getElementById("type-protest-select").value;
    console.log(typeProtestGet);
    var initiatedProtestGet = document.getElementById("initiated-select").value;
    console.log(initiatedProtestGet);
    var defenseSectorProtestGet = document.getElementById("defense-sector-protest").value;
    console.log(defenseSectorProtestGet);
    var nameProtestGet = document.getElementById("name-protest").value;
    console.log(nameProtestGet);
    var promotedByProtest = document.getElementById("promotedByProtest").value;
    console.log(promotedByProtest);
    //  var tittleProtestLetterGet = document.getElementById("tittle-protest-letter").value;
    //  console.log(tittleProtestLetterGet);
    //  var bodyProtestLetterGet = document.getElementById("protestLetter").value;
    //  console.log(bodyProtestLetterGet);
    /** 
    var dateMonthProtestGet = dateProtestGet[3] + dateProtestGet[4];
    console.log(dateMonthProtestGet);
    var monthProtestGet = [];
    month();
    function month(){
        if(dateMonthProtestGet == 01){
            monthProtestGet = "Enero"
        }else if (dateMonthProtestGet == 02){
            monthProtestGet = "Febrero"
        }else if (dateMonthProtestGet == 03){
            monthProtestGet = "Marzo"
        }else if (dateMonthProtestGet == 04){
            monthProtestGet = "Abril"
        }else if (dateMonthProtestGet == 05){
            monthProtestGet = "Mayo"
        }else if (dateMonthProtestGet == 06){
            monthProtestGet = "Junio"
        }else if (dateMonthProtestGet == 07){
            monthProtestGet = "Julio"
        }else if (dateMonthProtestGet == 08){
            monthProtestGet = "Agosto"
        }else if (dateMonthProtestGet == 09){
            monthProtestGet = "Septiembre"
        }else if (dateMonthProtestGet == 10){
            monthProtestGet = "Octubre"
        }else if (dateMonthProtestGet == 11){
            monthProtestGet = "Noviembre"
        }else if (dateMonthProtestGet == 12){
            monthProtestGet = "Diciembre"
        }
        console.log(monthProtestGet);
    }
    */

    var getToken = sessionStorage.getItem("token")
    console.log(getToken);
    console.log(sessionStorage);

    data = new DataProtest(
        dataArea = "getafe",
        dataCity = "Madrid",
        dataCountry = "España",
        dateProtestGet,
        defenseSectorProtestGet,
        // dataAllWayPointPost,
        // monthProtestGet,
        nameProtestGet,
        promotedByProtest,
        typeProtestGet,
        timeProtestGet,
        initiatedProtestGet
    );
    console.log(data);
    zzz = JSON.stringify(data);
    console.log(zzz);

    dataToken = new Token(
        `Bearer ` + getToken,
    );
    console.log(dataToken);
    // ------------   Datos de la protesta  --------------- //

    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    var urlCreate = ('http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create');
    var urlFile = 'http://prueba-env.us-east-2.elasticbeanstalk.com/protests/loadfile/';


  
    fetch((proxyurl + urlCreate), {
            method: 'POST',
            body: JSON.stringify(
                {
                    "areaProtest": "Madrid",
                    "cityProtest": "Madrid",
                    "countryProtest": " España",
                    "dateProtest": "17-02-2020",
                    "defenseSectorProtest": "corrupcion",
                    "locationsProtest": [
                      {
                        "latitude": 40.43582137349912,
                        "longitude": -3.707867157702589,
                        "pointNumber": 0
                      },
                      {
                        "latitude": 40.43373082690676,
                        "longitude": -3.7085538032104015,
                        "pointNumber": 1
                      },
                      {
                        "latitude": 40.430856219214824,
                        "longitude": -3.7058072211791515,
                        "pointNumber": 2
                      },
                      {
                        "latitude": 40.42850417606647,
                        "longitude": -3.6999707343627453,
                        "pointNumber": 3
                      },
                      {
                        "latitude": 40.4277201434038,
                        "longitude": -3.691387665515089,
                        "pointNumber": 4
                      },
                      {
                        "latitude": 40.43190154532075,
                        "longitude": -3.6865811469604015,
                        "pointNumber": 5
                      }
                    ],
                    "monthProtest": "FEBRUARY",
                    "nameProtest": "ALVARO LOPEZ GARCIA",
                    "promotedByProtest": "ONU",
                    "protestType": "MANIFESTACION",
                    "timeProtest": "18:10",
                    "userType": "FISICA"
                  }
            ),
            headers: {
                'Authorization': `Bearer ` + sessionStorage.token,
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))



    /*
        $.ajax({
            url: urlCreate,
            method: 'POST',
            data: JSON.stringify(data),
            headers:{
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
                'Access-Control-Allow-Credentials': '*',
                'Authorization': `Bearer ` + sessionStorage.token,
                'Content-Type': 'application/json'
            },
            
            success: function () {
                $('#successModal').modal('show');
            },
            error: function (jqXHR) {
                $('#divErrorText').text(jqXHR.responseText);
                $('#divError').show('fade');
            }
        });
*/
    
    /*
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let request = {
            headers:{
                'Authorization': `Bearer ` + sessionStorage.token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }

        fetch(urlCreate, request)
        .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    */

    /*
            // ERROR CORS
        
            fetch("http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create", {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data),
                    // mode:'cors',
                    headers: {
                        'Authorization': `Bearer ` + sessionStorage.token,
                        "Accept": "application/json",
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

/*
            
            // ERROR 400

            fetch("http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create", {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data),
                // mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
*/
/*
    fetch(urlCreate, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ` + sessionStorage.token,
                "Accept": "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        // console.log(body);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {})
        .then(function (data) {
            console.log(data)
            return data;
        })


    /*
    fetch(urlFile, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ` + sessionStorage.token,
            'Content-Type': 'application/json',
        },
        //mode: 'no-cors',
        body: attachedDoc
    })
        // console.log(body);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
        })
        .then(function (data) {
            console.log(data)
            return data;
        })
        */


});
