//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    function DataProtest(nameProtest1, cityProtest1, whoDefendsProtest1, promotedByProtest1) {
        this.name = nameProtest1;
        this.city = cityProtest1;
        this.whoDefends = whoDefendsProtest1;
        this.promotedBy = promotedByProtest1;
        // this.date = dateProtest1;
        // this.area = areaProtest1;
        // this.time = timeProtest1;
    }
    var countryProtestGet = document.getElementById("country-protest-select").value;
    console.log(countryProtestGet);
    var cityProtestGet = document.getElementById("city-protest-select").value;
    console.log(cityProtestGet);
    var dateProtestGet = document.getElementById("city-protest-select").value;
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