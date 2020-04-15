// data-table      https://www.youtube.com/watch?v=70j_1YRfblM
// https://www.youtube.com/watch?v=e-HA2YQUoi0
// fetch con data-table  https://datatables.net/forums/discussion/54076/use-fetch-api-instead-of-ajax-call-in-datatable
// https://eldesvandejose.com/2016/12/05/el-plugin-datatables-xii-datos-dependientes/
// https://es.stackoverflow.com/questions/105468/c%C3%B3mo-recorrer-una-table-que-tiene-paginaci%C3%B3n
// https://datatables.net/forums/discussion/44058/datatable-ajax-json

$(document).ready(function () {

    var countryFilter = [];
    var cityFilter = []
    var typeProtestFilter = [];
    var textFilter = [];
    var numberPage = [];
    var protestId = [];

    $('#country-protest-select').change(function () {
        countryFilter = $(this).val();
        console.log(countryFilter);
    });
    $('#city-protest-select').change(function () {
        cityFilter = $(this).val();
        console.log(cityFilter);
    });
    $('#type-protest-select').change(function () {
        typeProtestFilter = $(this).val();
        console.log(typeProtestFilter);
    });
    $('#filter-text').change(function () {
        textFilter = $(this).val();
        console.log(textFilter);
    });
    //  No funcionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    $('.pagination').click(function () {
        numberPage = $('.pagination h1').getAttribute("class");
        console.log(numberPage);
    });


    $('#btn-insert-protest').click(function () {

        if (sessionStorage.getItem('token') == null) {
            sessionStorage.setItem('bntInsertProtest', 'click');
            console.log(sessionStorage);
            location.href = "login-sing-up.html";
        } else {
            location.href = "insert-protest.html";
        }
    });

    $('#linkClose').click(function () {
        $('#divError').hide('fade');
    });

    $('#errorModal').on('hidden.bs.modal', function () {
        window.location.href = "login-sing-up.html";
    });


    // Get para pedir información del usuario y poder saber cual puede modificar o eliminar
    var userAllId = []
    
    fetch('url')
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            
        })

    var table = $('#list-protest').DataTable({
        // processing: true,
        // serverSide: true,
        // orderMulti: false,
        // dom: '<"top"i>rt<"botton"lp><"clear">',
        searching: false,
        info: false,
        pageLength: 10,
        pagingType: "full_numbers",
        dom: 'Bfrtip',
        ajax: {
            url: "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list/1",
            dataSrc: "protests",
            // headers y error para token
            headers: {
                // 'Authorization': 'Bearer '
                //    + sessionStorage.getItem("token")
            },
            body: {

            },
            error: function (jQXHR) {
                // If status code is 401, access token expired, so
                // redirect the user to the login page
                if (jQXHR.status == "401") {
                    $('#errorModal').modal('show');
                } else {
                    $('#divErrorText').text(jqXHR.responseText);
                    $('#divError').show('fade');
                }
            }
        },
        columns: [{
                data: "name",
                render: function (data, type, name) {
                    return `<a id="${name.id}" class="protest-id" href='protest-id.html'>${name.nameProtest}</a>`
                },
                visible: true,
            },
            {
                data: "whoDefends",
                render: function (data, type, whoDefends) {
                    return "<a>" + whoDefends.defenseSectorProtest + "</a"
                },
            },
            {
                data: "promotedBy",
                render: function (data, type, promotedBy) {
                    return "<a>" + promotedBy.promotedByProtest + "</a"
                },
            },
            {
                data: "city",
                render: function (data, type, city) {
                    return "<a>" + city.cityProtest + "</a"
                },
            },
            {
                data: "date",
                render: function (data, type, date) {
                    return "<a>" + date.dateProtest + "</a"
                },
            },
            {
                data: "id",
                render: function (deleteId) {
                    return `
                    <div class="col text-center">
                            <button id="btn-start" onclick="delete-protest" class='btn btn-link bg-danger p-0 js-eliminar' style="height: 25px; width: 25px" role="button" data-name-id='${deleteId}'>
                                <i class="fas fa-times text-white"></i>
                            </button>
                    </div>
                    `
                },
            },
        ]

    });
    /*
        $('#country-protest-select').change(function(){
            table.column(3).search($(this).val())
            .draw();
            console.log("hola");
        }); 

        // filtro de los select
        $('#city-protest-select').change(function(){
            table.column(3).search($(this).val())
            .draw();
            console.log("hola");
        });   
        $('#filter-text').on( 'keyup', function () {
            table.search( this.value ).draw();
        } );
    */
    $('#list-protest').on('click', '.protest-id', function () {
        var button = $(this);
        protestId = button.attr("id");
        sessionStorage.setItem("protesId", protestId);
    });

    $('#list-protest').on('click', '.js-eliminar', function () {
        var button = $(this);
        var deleteId = confirm("¿Esta seguro de eliminar?");
        if (deleteId == true) {
            var root = "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/delete/";
            var rootId = button.attr("data-name-id")
            var url = root += rootId;
            console.log(url);
            $.ajax({
                url: url,
                method: "DELETE",
                // headers para token
                headers: {
                    'Authorization': 'Bearer ' +
                        sessionStorage.getItem("token")
                },
                success: function () {
                    console.log("Petición Exitosa")
                    button.parents("tr").remove();
                }
            })
        } else {
            console.log("Petición de eliminar CANCELADA")
        }
    });
});