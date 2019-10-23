//  https://www.youtube.com/watch?v=c3qWHnJJbSY
//  https://www.youtube.com/watch?v=-iv274it7CM

const protestsCreate = document.getElementById('form-protests-create');

protestsCreate.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')
    
    // para meter datos a cholón
    let newPost = {
        area: "Boadilla del Monte",
        city: "Madrid",
        date: "2019-10-01",
        name: "Por nuesta sanidad",
        promotedBy: "Álvaro López",
        time: "10:30",
        whoDefends: "Sanidad"          
    }
    
    /* 1-------- Para obtener el valor */
    var cod = document.getElementById("city-protest-select").value;
    console.log(cod);
    
    var nameForm = document.getElementById("city-protest-select").name;
    console.log(nameForm);

    var selectedOptions = $('#city-protest-select option:selected');
    var dataForm = '';
    selectedOptions.each(function () {
        dataForm += `{"${nameForm}": "${cod}"}`
    });
    console.log(dataForm);


    /* 1 -------- Para obtener el texto 
    var combo = document.getElementById("city");
    var selected = combo.options[combo.selectedIndex].text;
    alert(selected);

    /* 2......... 
    var select = document.getElementById("city-protest-select");
    var options=document.getElementsByTagName("option");
    console.log(select.value);
    console.log(options[select.value-1].innerHTML)

    */

    var data = new FormData(protestsCreate);

    var select1 = document.getElementById("city-protest-select").value;
    // console.log(select1);



    fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
              ],
            body: JSON.stringify(dataForm)
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