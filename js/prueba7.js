//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    capturar();

    function capturar() {
        console.log("capturar");
        function Personas(city) {
            this.city = city;
        }
        var cityGet = document.getElementById("nombre").value;
        console.log(cityGet);
    
        dataForm = new Personas(cityGet);
        console.log(dataForm);
        
        // sirve para agregar la funcion de abajo
        agregar();
    }
    
    var baseDatos = [];
    
    function agregar() {
        //console.log("capturado");
        baseDatos.push(dataForm);
        console.log(baseDatos);
    };

    fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
              ],
            body: JSON.stringify(baseDatos)
        })
        console.log(newProtest);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data;
        })
        
});