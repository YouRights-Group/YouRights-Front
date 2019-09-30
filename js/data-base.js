//  https://www.youtube.com/watch?v=M4LaQ3KUGOM&list=PLPl81lqbj-4I11QPam9ApoT7tGbmyBg9P&index=15

$( document ).ready(function() {

    console.log('11111111111111');

    const listProtest = new XMLHttpRequest();

    listProtest.open('GET', 'list_protest.json', true);

    listProtest.send();
    console.log('2222222222222');
    listProtest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            console.log('33333333333333333');

            let dataTextListProtest = JSON.parse(this.responseText);
            console.log(dataTextListProtest);

            console.log('holaaaa');
            
            let dataJsonListProtest = document.querySelector('#data-list-protest');
            dataJsonListProtest.innerHTML = '';

            for(let item of dataTextListProtest){
               // console.log('555555555555555');
               dataJsonListProtest.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.defends}</td>
                    <td>${item.promoted}</td>
                    <td>${item.area}</td>
                    <td>${item.registered}</td>
                </tr>
               `
            }

        }

}

});