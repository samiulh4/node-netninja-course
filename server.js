const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log('Request URL : ' + req.url);
    console.log('Request Method : ' + req.method);

    // set header content type
    res.setHeader('Contect-Type', 'text/html');

    /*res.write('<h1>I love my country, i love my land, green bangladesh my home land.</h1>');
    res.end();*/

    // basic routing
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        default:
            path += '404.html';
            break;    
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
        }
        res.end();
    });

});


server.listen(3000, 'localhost', () => {
    console.log('Listen for request on port 3000');
});