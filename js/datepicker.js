$(document).ready(function () {
    /*
    $('.fj-date').datepicker({
        format: "dd/mm/yyyy",
        language: 'es',
    });
    */
    $('.date-datepicker').datetimepicker({
        timepicker: false,
        format: 'd-m-Y'
    });

    $('.time-datepicker').datetimepicker({
        step: 10,
        datepicker: false,
        format: 'H:i'
    });

});