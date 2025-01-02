# magic-cloud-project
Project for SE Cloud

npm run build
docker build -t magic-cloud .
docker tag magic-cloud <username_docker>/magic-cloud
docker push <username_docker>/magic-cloud
kubectl apply -f magic-deployment.yml
kubectl apply -f ingress.yml
cd ../magic-cloud-back
./gradlew build
docker build -t magic-cloud-back .
docker tag magic-cloud-back paulinedav/magic-cloud-back:latest
docker push paulinedav/magic-cloud-back:latest
kubectl apply -f magic-cloud-back-deployment.yml
kubectl apply -f ingress-back.yml
cd ../postgres
docker build -t custom-postgres:10.1 . (optionnel)
docker tag custom-postgres:10.1 <username_docker>/custom-postgres:10.1 (optionnel)
docker push <username_docker>/custom-postgres:10.1 (optionnel)
kubectl apply -f postgres-secret.yaml    
kubectl apply -f configmap.yaml              
kubectl apply -f postgres-deployment.yaml   
kubectl apply -f postgres-service.yaml 

minikube tunnel
minikube service magic-cloud --url

npm run build
docker build -t magic-cloud .
docker tag magic-cloud paulinedav/magic-cloud:latest
docker push paulinedav/magic-cloud:latest
kubectl delete -f magic-deployment.yml
kubectl apply -f magic-deployment.yml