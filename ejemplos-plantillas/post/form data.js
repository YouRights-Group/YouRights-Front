//   https://www.youtube.com/watch?v=gL8M9Sl5QLs
//   https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

//Sending Data to the Server using Fetch()
//using jsonplaceholder for the data
//GET - queryStrings
// http://jsonplaceholder.typicode.com/posts?userId=1&postId=65
// http://jsonplaceholder.typicode.com/todos?userId=2
//POST
// http://jsonplaceholder.typicode.com/posts  

const root = 'http://jsonplaceholder.typicode.com/';
let uri = root + 'posts';

let formdata = new FormData();
formdata.append("userId", 3);
formdata.append('title','This is my title');
formdata.append('body','This is the body text of the post');

let options = {
    method: 'POST',
    mode: 'cors',
    body: formdata
}
let req = new Request(uri, options);

fetch(req)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad HTTP!')
        }
    })
    .then( (j) =>{
        console.log(j);
    })
    .catch( (err) =>{
        console.log('ERROR:', err.message);
    });
