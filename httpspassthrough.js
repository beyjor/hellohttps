var https = require('https');
var fs = require('fs');
var qs = require('querystring');

var SERVERPORT = process.env.SERVERPORT || 8383;
var CLIENTPORT = process.env.CLIENTPORT || 8181;
var CLIENTHOST = process.env.CLIENTHOST || 'localhost';
var SERVERKEY = process.env.SERVERKEY || 'examplecerts/example_key.key';
var SERVERCERT = process.env.SERVERCERT || 'examplecerts/example_cert.crt';
var CLIENTCERT = process.env.CLIENTCERT || 'examplecerts/example_cert.crt';
var MESSAGETOADD = process.env.MESSAGETOADD || "Passing through";

console.log('Running with client port: ', CLIENTPORT);
console.log('Running with client host: ', CLIENTHOST);
console.log('Running with server port: ', SERVERPORT);
console.log('Looking for server key: ', SERVERKEY);
console.log('Looking for server cert: ', SERVERCERT);
console.log('Looking for client cert: ', CLIENTCERT);

var serveroptions = {
  key: fs.readFileSync(SERVERKEY),
  cert: fs.readFileSync(SERVERCERT)
};

var handleRequest = function(request, response) {

  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);

  var clientoptions = { 
    hostname: CLIENTHOST, 
    port: CLIENTPORT, 
    path: '/',  
    ca: fs.readFileSync(CLIENTCERT) 
  }; 

  https.get(clientoptions, function(res) { 

    let data = '';

    // A chunk of data has been recieved.
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on('end', () => {
      console.log(data);
      response.end("<" + MESSAGETOADD + "> : " + data);
    });
  }).on("error", (err) => {
    console.log("Client error: " + err.message);
  }); 
};

//Create the server
var www = https.createServer(serveroptions, handleRequest);

//Start server
www.listen(SERVERPORT, function(){
  console.log("Server listening on: https://0.0.0.0:" + SERVERPORT);
});
