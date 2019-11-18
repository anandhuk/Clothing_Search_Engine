var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  res.send('You sent the name "' + req.body.search + '".');
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});










// // Using querystring instead of express.
// var qs = require('querystring');

// function processForm(request, response) {
//     if (request.method == 'POST') {
//         var body = '';

//         request.on('data', function (data) {
//             body += data;

//             // Too much POST data, kill the connection!
//             // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
//             if (body.length > 1e6)
//                 request.connection.destroy();
//         });

//         request.on('end', function () {
//             var post = qs.parse(body);
//             // use post['blah'], etc.
//             console.log(post.age);
//         });
//     }
// }












// var express = require("express"),
//     app = express(),
//     bodyParser = require('body-parser'),
//     port = process.env["PORT"] || 8080;
 
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
 
// app.get("/my-url", function(req, res) {
//     // if you chose to send data as a query in the URL
//     console.log(req.query.q);
//     // if you chose to send data as JSON
//     console.log(req.body.q);
 
//     // finally, respond to the client
//     res.send("Okay");
// });
 
// app.listen(port)
// console.log("listening to server on port:", port);