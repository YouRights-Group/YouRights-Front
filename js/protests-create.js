//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    // ------------   Datos personales   --------------- //
    /*
    function PersonalInformation(
        firstNameUser, 
        lastNameUser, 
        dniUser, 
        emailUser, 
        repeatEmailUser, 
        countryUser, 
        cityUser, 
        streetUser, 
        numberStreetUser, 
        phoneUser,
        postalCodeUser
    ){
        this.firstNameUser = firstNameUser;
        this.lastNameUser = lastNameUser;
        this.dniUser = dniUser;
        this.emailUser = emailUser;
        this.repeatEmailUser = repeatEmailUser;
        this.countryUser = countryUser;
        this.cityUser = cityUser;
        this.postalCodeUser = postalCodeUser;
        this.streetUser = streetUser;
        this.numberStreetUser = numberStreetUser;
        this.phoneUser = phoneUser;
    }
    var firstNameUser = document.getElementById("first-name").value;
    console.log(firstNameUser);
    var lastNameUser = document.getElementById("last-name").value;
    console.log(lastNameUser);
    var dniUser = document.getElementById("dni-user").value;
    console.log(dniUser);
    var emailUser = document.getElementById("email-user").value;
    console.log(emailUser);
    var repeatEmailUser = document.getElementById("repeat-email-user").value;
    console.log(repeatEmailUser);
    var countryUser = document.getElementById("country-select").value;
    console.log(countryUser);
    var cityUser = document.getElementById("city-select").value;
    console.log(cityUser);
    var postalCodeUser = document.getElementById("postal-code-user").value;
    console.log(postalCodeUser);
    var streetUser = document.getElementById("street-user").value;
    console.log(streetUser);
    var numberStreetUser = document.getElementById("number-street-user").value;
    console.log(numberStreetUser);
    var phoneUser = document.getElementById("phone-user").value;
    console.log(phoneUser);

    personalInformation = new PersonalInformation(
        firstNameUser,
        lastNameUser, 
        dniUser,
        emailUser,
        repeatEmailUser,
        countryUser,
        cityUser,
        postalCodeUser,
        streetUser,
        numberStreetUser,
        phoneUser
    );
    console.log(personalInformation);
    */
    // ------------   Datos personales.   --------------- //

    // ------------   Datos de la protesta   --------------- //

    function DataProtest(nameProtest, cityProtest, whoDefendsProtest, promotedByProtest, dateProtest) {
        this.name = nameProtest;
        this.city = cityProtest;
        this.whoDefends = whoDefendsProtest;
        this.promotedBy = promotedByProtest;
        this.date = dateProtest;
        // this.area = areaProtest1;
        // this.time = timeProtest1;
    }
    var countryProtestGet = document.getElementById("country-protest-select").value;
    console.log(countryProtestGet);
    var cityProtestGet = document.getElementById("city-protest-select").value;
    console.log(cityProtestGet);
    var dateProtestGet = document.getElementById("date-protest").value;
    console.log(dateProtestGet);
    var typeProtestGet = document.getElementById("type-protest-select").value;
    console.log(typeProtestGet);
    var initiatedProtestGet = document.getElementById("initiated-select").value;
    console.log(initiatedProtestGet);
    var defenseSectorProtestGet = document.getElementById("defense-sector-protest").value;
    console.log(defenseSectorProtestGet);
    var nameProtestGet = document.getElementById("name-protest").value;
    console.log(nameProtestGet);
    var tittleProtestLetterGet = document.getElementById("tittle-protest-letter").value;
    console.log(tittleProtestLetterGet);
    var bodyProtestLetterGet = document.getElementById("body-protest-letter").value;
    console.log(bodyProtestLetterGet);
    

    dataForm = new DataProtest(
        nameProtestGet,
        cityProtestGet, 
        defenseSectorProtestGet,
        initiatedProtestGet,
        dateProtestGet
    );
    console.log(dataForm);
    // ------------   Datos de la protesta  --------------- //

    fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
              ],
            body: JSON.stringify(dataForm)
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
        
});