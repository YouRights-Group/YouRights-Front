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

$( document ).ready(function() {
    console.log('hola')
    
    async function main(){ 
            const response = await fetch('http://prueba-env.us-east-2.elasticbeanstalk.com/protests/list'); 
            const myJson = await response.json(); 
    
            console.log('hola')
            $.each(myJson, function(key, val){
                items.push("<tr>");
                items.push("<td id=''"+key+"''>"+val.protests.name+"</td>");
                items.push("<td id=''"+key+"''>"+val.protests.city+"</td>");
                items.push("</tr>");
    
            });
    
        }
    
    main();
    
    });