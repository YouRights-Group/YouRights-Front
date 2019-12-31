// data-table      https://www.youtube.com/watch?v=70j_1YRfblM
// https://www.youtube.com/watch?v=e-HA2YQUoi0
// fetch con data-table  https://datatables.net/forums/discussion/54076/use-fetch-api-instead-of-ajax-call-in-datatable
$(document).ready(function() {

    var table = $('#list-protest').DataTable({
        // processing: true,
        // serverSide: true,
        // orderMulti: false,
        // dom: '<"top"i>rt<"botton"lp><"clear">',
        // searching: false,
        info: false,
        pageLength : 10,
        dom: 'Bfrtip',
        ajax: {
            url: "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list",
            dataSrc: "protests",
            // headers y error para token
            headers: {
                'Authorization': 'Bearer '
                    + sessionStorage.getItem("token")
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
        },
        columns: [
            {
                data: "name",
                render: function (data, type, name){
                    return `<a href='../protest-id${name.id}'>${name.name}</a>`
                },
                visible: true,
            },
            {
                data: "whoDefends",
                render: function (data, type, whoDefends){
                    return "<a" + whoDefends.id + ">" + whoDefends.whoDefends + "</a"
                },
            },
            {
                data: "promotedBy",
                render: function (data, type, promotedBy){
                    return "<a" + promotedBy.id + ">" + promotedBy.promotedBy + "</a"
                },
            },
            {
                data: "city",
                render: function (data, type, city){
                    return "<a" + city.id + ">" + city.city + "</a"
                },
            },
            {
                data: "date",
                render: function (data, type, date){
                    return "<a" + date.id + ">" + date.date + "</a"
                },
            },
            {
                data: "id",
                render: function (deleteId){
                    return `<button id="btn-start" onclick="delete-protest" class='btn btn-link js-eliminar' role="button" data-name-id='${deleteId}'>Eliminar</button>`
                },
            }
        ]
        
    });

    // filtro de los select
    $('#city_select').change(function(){
        table.column(3).search($(this).val())
        .draw();
    });   

    $('#list-protest').on('click', '.js-eliminar', function(){
        var button = $(this);
        var deleteId = confirm("¿Esta seguro de eliminar?");
        if (deleteId == true){
            var root = "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/delete/";
            var rootId = button.attr("data-name-id")
            var url = root += rootId;
            console.log(url);
            $.ajax({
                url: url,
                method: "DELETE",
                // headers para token
                headers: {
                    'Authorization': 'Bearer '
                        + sessionStorage.getItem("token")
                },
                success: function (){
                    console.log("Petición Exitosa")
                    button.parents("tr").remove();
                }
            })
        } else {
            console.log("Petición de eliminar CANCELADA")
        }
    });
});