// data-table      https://www.youtube.com/watch?v=70j_1YRfblM
// fetch con data-table  https://datatables.net/forums/discussion/54076/use-fetch-api-instead-of-ajax-call-in-datatable
$(document).ready(function() {

    dataTableFunction();

    function dataTableFunction (){

        $('#list-protest').DataTable({
            // processing: true,
            // serverSide: true,
            // orderMulti: false,
            // dom: '<"top"i>rt<"botton"lp><"clear">',
            // searching: false,
            info: false,
            ajax: {
                url: "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list",
                dataSrc: "protests"
            },
            columns: [
                {
                    data: "name",
                    render: function (data, type, name){
                        return `<a href='../protest-id${name.id}'>${name.name}</a>`
                    },
                },
                {
                    data: "whoDefends",
                    render: function (data, type, whoDefends){
                        return "<a href='../protest-id" + whoDefends.id + "'>" + whoDefends.whoDefends + "</a>"
                    },
                },
                {
                    data: "promotedBy",
                    render: function (data, type, promotedBy){
                        return "<a href='../protest-id" + promotedBy.id + "'>" + promotedBy.promotedBy + "</a>"
                    },
                },
                {
                    data: "city",
                    render: function (data, type, city){
                        return "<a href='../protest-id" + city.id + "'>" + city.city + "</a>"
                    },
                },
                {
                    data: "date",
                    render: function (data, type, date){
                        return "<a href='../protest-id" + date.id + "'>" + date.date + "</a>"
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
    };
    table = $('#list-protest').DataTable();
    $('#filter').click(function(){
        var city_select = $('#city_select').val();
        console.log(city_select);
        if(city_select != ''){
            console.log(city_select);
            table.columns(3).search($('#city_select').val().trim());
            table.draw();
            // $('#list-protest').DataTable().destroy();
            // dataTableFunction(city_select);
        } else {
            alert ('ssssssssssss');
            $('#list-protest').DataTable();
            dataTableFunction();
        }
    });
    $('#filter').click(function(){
        $('#city-select').val('');
        $('#list-protest').DataTable().destroy();
        dataTableFunction();
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