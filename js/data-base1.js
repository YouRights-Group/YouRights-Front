//  https://www.youtube.com/watch?v=M4LaQ3KUGOM&list=PLPl81lqbj-4I11QPam9ApoT7tGbmyBg9P&index=15
//  https://www.youtube.com/watch?v=pUQFToFrMF4

//  https://www.youtube.com/watch?v=ZDtN2Dm1LYM
//  https://www.youtube.com/watch?v=J9W0aW78o14&t=1041s
//  https://www.youtube.com/watch?v=52niJ-2TrQ0&t=4s
//  https://www.youtube.com/results?search_query=%24getJSON+jQuery.prototype+json
//  https://obedalvarado.pw/blog/paginacion-con-php-mysql-jquery-ajax-y-bootstrap/
//  https://blog.openalfa.com/como-leer-ficheros-json-con-jquery-en-modo-sincrono
//  https://foros.velneo.es/t/modificar-registro-en-base-a-un-json/7672
//  https://www.youtube.com/watch?v=fqMOntGd2BQ

$(document).ready(function () {
    console.log('hola')

    async function main() {
        fetch('http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list')
        .then((res) => res.json())
        .then((data) => {
            
            var items = [];

            $.each(data.protests, function(key, val){

                items.push("<tr>");
                items.push("<td id=''"+key+"''>"+val.name+"</td>");
                items.push("<td id=''"+key+"''>"+val.whoDefends+"</td>");
                items.push("<td id=''"+key+"''>"+val.promotedBy+"</td>");
                items.push("<td id=''"+key+"''>"+val.city+"</td>");
                items.push("<td id=''"+key+"''>"+val.date+"</td>");
                items.push("</tr>");

            });

            $("<tbody/>", {html: items.join("")}).appendTo("table");
        })

    }

    main();

});

//  http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list