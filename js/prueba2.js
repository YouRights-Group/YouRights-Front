//  https://www.youtube.com/watch?v=c3qWHnJJbSY

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function(e){
    e.preventDefault();
    console.log('me diste un click')

    const formData = new FormData(this);

    const searchParams  = new URLSearchParams();

    // el for recorre el formdata del 1 (0) al 9 (10) input
    for (const pair of formData){
        searchParams.append(pair[0], pair[2]);
    }

    //  http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create
    //  http://jsonplaceholder.typicode.com/posts

    fetch('http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create', {

            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: searchParams

    })
        .then(function(response){
            return response.json();
        })
        .then(function(text){
            console.log(text);
        })
        .catch(function(error){
            console.log(error);
        })

});

