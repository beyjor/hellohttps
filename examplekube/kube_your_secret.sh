#!/bin/bash

kubectl create secret generic examplecerts --from-file=../examplecerts/example_cert.crt --from-file=../examplecerts/example_key.key
