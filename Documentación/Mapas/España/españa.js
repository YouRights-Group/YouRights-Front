var regions=[
    {
        "region_name": "Albacete",
        "region_code": "2",
        "population": 5769750
    },
    {
        "region_name": "Alicante",
        "region_code": "3",
        "population": 5557276
    },
    {
        "region_name": "Almería",
        "region_code": "4",
        "population": 4999932
    },
    {
        "region_name": "Ávila",
        "region_code": "6",
        "population": 4377487
    },
    {
        "region_name": "Badajoz",
        "region_code": "7",
        "population": 4374052
    },
    {
        "region_name": "Barcelona",
        "region_code": "8",
        "population": 4050803
    },
    {
        "region_name": "Burgos",
        "region_code": "9",
        "population": 3692828
    },
    {
        "region_name": "Cáceres",
        "region_code": "10",
        "population": 1958238
    },
    {
        "region_name": "Cadiz",
        "region_code": "11",
        "population": 1640379
    },
    {
        "region_name": "Castellón",
        "region_code": "13",
        "population": 1545155
    },
    {
        "region_name": "Ciudad Real",
        "region_code": "14",
        "population": 1312507
    },
    {
        "region_name": "Córdoba",
        "region_code": "15",
        "population": 1221860
    },
    {
        "region_name": "La Coruña",
        "region_code": "16",
        "population": 1039934
    },
    {
        "region_name": "Cuenca",
        "region_code": "17",
        "population": 886239
    },
    {
        "region_name": "Gerona",
        "region_code": "18",
        "population": 576194
    },
    {
        "region_name": "Granada",
        "region_code": "19",
        "population": 313341
    },
    {
        "region_name": "Guadalajara",
        "region_code": "20",
        "population": 127844
    },
    {
        "region_name": "Huelva",
        "region_code": "22",
        "population": 5769750
    },
    {
        "region_name": "Huesca",
        "region_code": "23",
        "population": 5557276
    },
    {
        "region_name": "Bilbao",
        "region_code": "24",
        "population": 4999932
    },
    {
        "region_name": "Jaén",
        "region_code": "25",
        "population": 4881756
    },
    {
        "region_name": "León",
        "region_code": "26",
        "population": 4377487
    },
    {
        "region_name": "Lérida",
        "region_code": "27",
        "population": 4374052
    },
    {
        "region_name": "Lugo",
        "region_code": "28",
        "population": 4050803
    },
    {
        "region_name": "Madrid",
        "region_code": "29",
        "population": 3692828
    },
    {
        "region_name": "Málaga",
        "region_code": "30",
        "population": 1958238
    },
    {
        "region_name": "Murcia",
        "region_code": "31",
        "population": 1640379
    },
    {
        "region_name": "Palencia",
        "region_code": "35",
        "population": 1312507
    },
    {
        "region_name": "Las Palmas",
        "region_code": "36",
        "population": 1221860
    },
    {
        "region_name": "Pontevedra",
        "region_code": "37",
        "population": 1039934
    },
    {
        "region_name": "Logroño",
        "region_code": "38",
        "population": 886239
    },
    {
        "region_name": "Salamanca",
        "region_code": "39",
        "population": 576194
    },
    {
        "region_name": "Segovia",
        "region_code": "40",
        "population": 313341
    },
    {
        "region_name": "Sevilla",
        "region_code": "41",
        "population": 127844
    },
    {
        "region_name": "Soria",
        "region_code": "42",
        "population": 313341
    },
    {
        "region_name": "Tarragona",
        "region_code": "43",
        "population": 127844
    },
    {
        "region_name": "Santa Cruz de Tenerife",
        "region_code": "44",
        "population": 9794525
    },
    {
        "region_name": "Teruel",
        "region_code": "45",
        "population": 5769750
    },
    {
        "region_name": "Toledo",
        "region_code": "46",
        "population": 5557276
    },
    {
        "region_name": "Valencia",
        "region_code": "47",
        "population": 4999932
    },
    {
        "region_name": "Valladolid",
        "region_code": "48",
        "population": 4881756
    },
    {
        "region_name": "Vitoria",
        "region_code": "49",
        "population": 4377487
    },
    {
        "region_name": "Zamora",
        "region_code": "50",
        "population": 4374052
    },
    {
        "region_name": "Zaragoza",
        "region_code": "51",
        "population": 4050803
    },
    {
        "region_name": "Orense",
        "region_code": "52",
        "population": 1958238
    },
    {
        "region_name": "Oviedo",
        "region_code": "53",
        "population": 3692828
    },
    {
        "region_name": "Palma de Mallorca",
        "region_code": "54",
        "population": 3692828
    },
    {
        "region_name": "San Sebastian",
        "region_code": "55",
        "population": 3692828
    },
    {
        "region_name": "Santander",
        "region_code": "56",
        "population": 3692828
    },
    {
        "region_name": "Pamplona",
        "region_code": "60",
        "population": 3692828
    },
    {
        "region_name": "Ceuta",
        "region_code": "100",
        "population": 3692828
    },
    {
        "region_name": "Melilla",
        "region_code": "101",
        "population": 1958238
    },
];


var temp_array= regions.map(function(item){
    return item.population;
});
var highest_value = Math.max.apply(Math, temp_array);

$(function() {

    for(i = 0; i < regions.length; i++) {

        $('#'+ regions[i].region_code)
        .css({'fill': 'rgba(0, 56, 255,' + regions[i].population/highest_value +')'})
        .data('region', regions[i]);
    }

    $('.map path').mouseover(function (e) {
        var region_data=$(this).data('region');
        $('<div class="info_panel">'+
            region_data.region_name + '<br>' +
            'Population: ' + region_data.population.toLocaleString("en-UK") +
            '</div>'
         )
        .appendTo('body');
    })
    .mouseleave(function () {
        $('.info_panel').remove();
    })
    .mousemove(function(e) {
        var mouseX = e.pageX, //X coordinates of mouse
            mouseY = e.pageY; //Y coordinates of mouse

        $('.info_panel').css({
            top: mouseY-50,
            left: mouseX - ($('.info_panel').width()/2)
        });
    });

});