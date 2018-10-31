var https = require('https');
var fs = require('fs');
var qs = require('querystring');

var PORT = process.env.PORT || 8181;
var SERVERKEY = process.env.SERVERKEY || 'examplecerts/example_key.key';
var SERVERCERT = process.env.SERVERCERT || 'examplecerts/example_cert.crt';
var MESSAGETOSEND = process.env.MESSAGETOSEND || 'It is now the end of the world in HTTPS!';

console.log('Running with port: ', PORT);
console.log('Looking for key: ', SERVERKEY);
console.log('Looking for cert: ', SERVERCERT);

var options = {
  key: fs.readFileSync(SERVERKEY),
  cert: fs.readFileSync(SERVERCERT)
};

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end(MESSAGETOSEND + '\n');
};

//Create the server
var www = https.createServer(options, handleRequest);

//Start server
www.listen(PORT, function(){
  console.log("Server listening on: https://0.0.0.0:" + PORT);
});
