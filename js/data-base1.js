// data-table      https://www.youtube.com/watch?v=70j_1YRfblM
// fetch con data-table  https://datatables.net/forums/discussion/54076/use-fetch-api-instead-of-ajax-call-in-datatable
$(document).ready(function() {
    $('#output').DataTable({
        ajax: {
            url: "http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list",
            dataSrc: ""
        },
        columns: [{
            data: "name",
            render: function (data, type, name){
                return "<a href='../protest-id" + name.id + "'>" + name.name + "</a>"
            }
        }]
    });
});