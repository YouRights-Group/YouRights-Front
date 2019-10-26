//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    function Personas(selectedOptions, tittleProtestLetter, nameProtest) {
        this.city = selectedOptions;
        this.name = tittleProtestLetter;
        this.whoDefends = nameProtest;
    }
    var tittleProtestLetterGet = document.getElementById("tittle-protest-letter").value;
    console.log(tittleProtestLetterGet);
    var nameProtestGet = document.getElementById("body-protest-letter").value;
    console.log(nameProtestGet);

    // esta funcion sirve para poder sacar el valor de los select
    function getSelectValue(){
        var countryProtest = document.getElementById("country-protest-select").value;
        console.log(countryProtest);
        var cityProtest = document.getElementById("city-protest-select").value;
        console.log(cityProtest);
        return (countryProtest, cityProtest);
    }
    // variable creada con el valor del return de la funcion para el select
    var retorno = getSelectValue();
    console.log(retorno);

    /*
    var selectedOptionsGet = $('#city-protest-select option:selected').text;
    console.log(selectedOptionsGet);
    */

    dataForm = new Personas(
        retorno,
        tittleProtestLetterGet, 
        nameProtestGet
    );
    console.log(dataForm);
    

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