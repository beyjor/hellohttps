#!/bin/bash

# Create a key and signing request
openssl req -new -config openssl.conf -out example_signing_request.csr -keyout example_key.key

# Sign the request with the same key
openssl x509 -req -extfile <(printf "subjectAltName=DNS:localhost,DNS:httpsserver,DNS:httpsclient,DNS:httpspassthrough") -in example_signing_request.csr -signkey example_key.key -out example_cert.crt -days 365
