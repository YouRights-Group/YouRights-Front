/*   https://www.youtube.com/watch?v=cLux5dmj0Qk */

var arr = [
    {
        "home_id": "1",
        "price": "925",
        "sqft": "1100",
        "num_of_beds": "2",
        "num_of_baths": "2.0",
    }, 
    {
        "home_id": "2",
        "price": "1425",
        "sqft": "1900",
        "num_of_beds": "4",
        "num_of_baths": "2.5",
    }
        /* ... (more homes) ...   */ 
];

/*Arr.filter  es una funcion de testeo que va a recorer 
  cada elemento del arreglo, hará una prueba y va a 
  retornar verdadero o falso, en caso de verdadero ese elemento del array se considera en el retorno
*/
var newArr = arr.filter(function(el){
    /*el es equivalente al objeto, al elemento.*/
    return (el.price === '1425');
});

console.log(newArr);