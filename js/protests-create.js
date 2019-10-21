//  https://www.youtube.com/watch?v=c3qWHnJJbSY

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    let newPost = {
        area: "Boadilla del Monte",
        city: "Madrid",
        date: "2019-10-12",
        name: "Por nuesta sanidad",
        promotedBy: "Álvaro López",
        time: "10:30",
        whoDefends: "Sanidad"          
    }

    fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
              ],
            body: JSON.stringify(newPost)
        })
        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('post request response data', data)
            return data;
        })

});