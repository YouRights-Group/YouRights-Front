//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    function Personas(name) {
        this.name = name;
    }
    var nameGet = document.getElementById("namee").value;
    console.log(nameGet);

    dataForm = new Personas(nameGet);
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