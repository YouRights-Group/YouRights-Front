//  https://www.youtube.com/watch?v=c3qWHnJJbSY

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    // para meter datos a cholón
    let newPost = {
        area: "Boadilla del Monte",
        city: "Madrid",
        date: "2019-10-12",
        name: "Por nuesta sanidad",
        promotedBy: "Álvaro López",
        time: "10:30",
        whoDefends: "Sanidad"          
    }

    var data = new FormData(protestsCreate);

    var select1 = document.getElementById("city-protest-select").value;
    console.log(select1);

    fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
              ],
            body: JSON.stringify(select1)
        })
        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data;
        })
        
});