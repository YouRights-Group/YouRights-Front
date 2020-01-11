

const contact = document.getElementById('form-contact');

const input = document.querySelector('input[type="file"]')
var attachedDoc = [];
input.addEventListener('change', function (e) {
    console.log(input.files)
    reader = new FileReader()
    reader.onload = function () {
            const imagen = new Image()
            imagen.src = reader.result
            //  document.body.appendChild(imagen)     sirve para que aparezca la imagen debajo del body
            console.log(imagen);
            console.log(reader);
        },
        reader.readAsDataURL(input.files[0]), // Esta es la clave para leer el formato
        attachedDoc.push(reader.result);
    console.log(reader);
    console.log(attachedDoc.result);
}, false)

contact.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('me diste un click')

    function Contact(nameContact, phoneContact, cityContact, emailContact, subjetContact, messageContact,attachedDoc) {
        this.nameContact = nameContact;
        this.phoneContact = phoneContact;
        this.cityContact = cityContact;
        this.emailContact = emailContact;
        this.subjetContact = subjetContact;
        this.messageContact = messageContact;
        this.attachedDoc = attachedDoc;
    }
    var nameContactGet = $('#name-contact').val();
    console.log(nameContactGet);
    var phoneContactGet = $('phone-contact').val();
    console.log(phoneContactGet);
    var cityContactGet = $('#city-contact').val();
    console.log(cityContactGet);
    var emailContactGet = $('#email-contact').val();
    console.log(emailContactGet);
    var subjetContactGet = $('#subjet-contact').val();
    console.log(subjetContactGet);
    var messageContactGet = $('#message-contact').val();
    console.log(messageContactGet);


    dataContact = new Contact(
        nameContactGet,
        phoneContactGet,
        cityContactGet,
        emailContactGet,
        subjetContactGet,
        messageContactGet,
        attachedDoc
    );
    console.log(dataContact);
    // ------------   Datos de la protesta  --------------- //

    fetch(`http://prueba-env.us-east-2.elasticbeanstalk.com/protests/create`, {
            method: 'POST',
            headers: [
                ["Content-Type", "application/json"]
            ],
            body: JSON.stringify(dataContact)
        })
        //  console.log(newProtest);

        // tambien:    .then((resp) => resp.json())
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.code == "WAR_001") {
                console.log(data)
                }else if (data.code == "WAR_002") {

                    }else if (data.code == "WAR_003") {

                        }else if (data.code == "WAR_004") {
                        
                        }else{
                            $('#alert-post').modal();
                        }
            console.log(data)
            return data;
        })

});