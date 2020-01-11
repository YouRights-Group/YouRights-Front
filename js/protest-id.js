$(document).ready(function () {
    if (sessionStorage.getItem('token') == null) {
        window.location.href = "protest-id.html";
    }

    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $('#errorModal').on('hidden.bs.modal', function () {
        window.location.href = "protest-id.html";
    });

    $('#btnLoadEmployees').click(function () {
        $.ajax({
            url: 'http://prueba-env.us-east-2.elasticbeanstalk.com/protests/id',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("token")
            },
            success: function (data) {
                $('#data-country-protestId').innerHTML(data.country);
                $('#data-city-protestId').innerHTML(data.city);
                $('#data-type-protestId').innerHTML(data.type);
                $('#data-city-protestId').innerHTML(data.city);
                $('#data-strike-protestId').innerHTML(data.strike);
                $('#data-defenceSector-protestId').innerHTML(data.defenceSector);
                $('#data-name-defenceSector-protestId').innerHTML(data.nameDefenceSector);
                $('#data-initiated-protestId').innerHTML(data.initiated);
                $('#data-name-initiated-protestId').innerHTML(data.nameInitiated);
                $('#data-date-protestId').innerHTML(data.date);
                $('#data-time-protestId').innerHTML(data.time);
                $('#title-letter-protestId').innerHTML(data.titleLetter);
                $('#text-letter-protestId').innerHTML(data.textLetter);
                $('#attached-protestId').innerHTML(data.attached);
                
                $('#tblBody').empty();
                $.each(data, function (index, value) {
                    var row = $('<tr><td>' + value.ID + '</td><td>'
                        + value.FirstName + '</td><td>'
                        + value.LastName + '</td><td>'
                        + value.Gender + '</td><td>'
                        + value.Salary + '</td></tr>');
                    $('#tblData').append(row);
                });
            },
            error: function (jQXHR) {
                // If status code is 401, access token expired, so
                // redirect the user to the login page
                if (jQXHR.status == "401") {
                    $('#errorModal').modal('show');
                }
                else {
                    $('#divErrorText').text(jqXHR.responseText);
                    $('#divError').show('fade');
                }
            }
        });
    });
});