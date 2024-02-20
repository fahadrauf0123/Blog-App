const http = require("http");
const fs = require("fs");
const lo = require("lodash");

const server = http.createServer((req, res) => {

    const num = lo.random(0, 20);
    console.log(num);

    const greet  = lo.once((name) => {
        console.log(`hello, ${name}`)
    })
    greet('fahad');
    greet('ali')
    // console.log("Request made !!");
    // console.log(req);
    // console.log(req.url, req.method)

    //set header content
    res.setHeader('Content-Type', 'text/html');

    // res.write("<h2>Hello, fellas!</h2>");
    // res.write("<h3>Hello again, fellas!</h3>");
    // res.end();


let path = "./views/";

switch(req.url){
    case '/':
        path += 'index.html';
        res.statusCode = 200;
    break;
    case '/about':
        path += 'about.html';
        res.statusCode = 200;
    break;
    case '/about-me': 
        res.statusCode = 301;
        res.setHeader("Location", "./about");
        res.end(); 
    break;
    default:
        path += '404.html';
        res.statusCode = 404;
    break;


} 
    


    // send html
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            // res.write(data);
            res.end(data);
        }

    })

});

server.listen(3000, 'localhost', () => {
    console.log("Listening for request")
});

