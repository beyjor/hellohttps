var fs = require('fs'); 
var https = require('https'); 

var PORT = process.env.PORT || 8181;
var HOST = process.env.HOST || 'localhost';
var CLIENTCERT = process.env.CLIENTCERT || 'examplecerts/example_cert.crt';


console.log('Running with port: ', PORT);
console.log('Running with host: ', HOST);
console.log('Looking for cert: ', CLIENTCERT);

var options = { 
    hostname: HOST, 
    port: PORT, 
    path: '/', 
    method: 'GET', 
    ca: fs.readFileSync(CLIENTCERT) 
}; 

var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    }); 
}).on("error", (err) => {
  console.log("Error: " + err.message);
}); 

req.end();
