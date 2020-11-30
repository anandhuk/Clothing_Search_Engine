const http = require('http');
const url = require('url');
const cheerio = require('cheerio');
const request = require('request');
// const express = require('express');

const hostname = '127.0.0.1'
const port = 8000

const server = http.createServer((request, response) => {
                if(request.url == '/' || request.url == '/?SEARCH=')
                {

                }
                else
                {
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    console.log('request ', request.url);

                    var params = url.parse(request.url,true).query;

                    console.log(params);
                    
                    // response.statusCode = 200;
                    // response.setHeader('Content-Type', 'text/plain');
                    response.write(request.url);
                    // response.end(request.url);
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end();
                }
            })

function searchSite() {
    request({
        method: 'GET',
        url: 'https://www.anandhu.com/s?searchTerm=jelly'
    }, (err, res, body) => {

        if(err) return console.error(err);

        let $ = cheerio.load(body);

        let title = $('title');

        console.log(title.text());
});
}

searchSite();
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})






// An EXAMPLE

// Node.js: HTTP SERVER Handling GET and POST Request 
// Show HTML Form at GET request.
// At POST Request: Grab form data and display them.
// Get Complete Source Code from Pabbly.com


// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function (req, res) {

//     if (req.method === "GET") {
//         // res.writeHead(200, { "Content-Type": "text/html" });
//         // fs.createReadStream("./public/form.html", "UTF-8").pipe(res);

//         // res.writeHead(200, {"Content-Type":"text/html"});
//         // res.writeHead(200, {"Content-Type":"text/plain"});

//         // console.log('request: ', req.url);

//         // var params = url.parse(req.url,true).query;

//         // console.log('params: ');
//         // console.log(params);
//         // console.log('params.SEARCH: ' + params.SEARCH);
        
//         // res.statusCode = 200;
//         // res.setHeader('Content-Type', 'text/plain');
//         // res.writeHead(200, {"Content-Type": "application/html"});
//         // res.write(req.url);
//         // res.end(req.url);
//         // res.writeHead(200, {"Content-Type": "application/json"});
//         // res.end();

//         // res.append('Content-Type', 'text/plain');
//         // res.end('Hello world!');


//     } else if (req.method === "POST") {
    
//         var body = "";
//         req.on("data", function (chunk) {
//             body += chunk;
//         });

//         req.on("end", function(){
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(body);
//         });
//     }
//     // console.log('HELLO');
// // }).listen(8000, '127.0.0.1');
// }).listen(8080);
// // }).listen(8000, '127.0.0.1')
