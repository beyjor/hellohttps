#!/bin/bash

./kube_your_secret.sh

kubectl create -f kube_your_objects.yaml

echo "Now you can expose your service with a proy using the following command: "
echo ""
echo "kubectl port-forward --namespace default svc/httpspassthrough PORT:PORT"
echo ""
echo ""
echo "Default ports are 8181 for the server or 8383 for the passthrough."
