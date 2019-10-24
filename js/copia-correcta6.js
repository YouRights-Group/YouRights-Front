//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    function Personas(name, tittleProtestLetter, nameProtest) {
        this.city = name;
        this.tittleProtestLetter = tittleProtestLetter;
        this.nameProtest = nameProtest;
    }
    var cityGet = document.getElementById("name-protest").value;
    console.log(cityGet);
    var tittleProtestLetterGet = document.getElementById("tittle-protest-letter").value;
    console.log(tittleProtestLetterGet);
    var nameProtestGet = document.getElementById("name-protest").value;
    console.log(nameProtestGet);

    dataForm = new Personas(cityGet, tittleProtestLetterGet, nameProtestGet);
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