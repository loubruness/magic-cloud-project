# magic-cloud-project
This is a project for Software Engineering for the Cloud.

Commands to execute (starting from the root of the project) : 

minikube start

If you plan on building all the images yourself, you should do a docker login beforehand and replace the name of the image in each deployment file. If not, you can just leave them as they are and use the images we used and published ourselves.

Front-end : 
```
cd magic-cloud
npm run build
docker build -t magic-cloud .
docker tag magic-cloud <username_docker>/magic-cloud
docker push <username_docker>/magic-cloud
kubectl apply -f magic-deployment.yml
```

Products service : 
```
cd ../magic-cloud-back
./gradlew clean build
docker build -t magic-cloud-back .
docker tag magic-cloud-back <username_docker>/magic-cloud-back:latest
docker push <username_docker>/magic-cloud-back:latest
kubectl apply -f magic-cloud-back-deployment.yml
```

Authentication service : 
```
cd ../magic-cloud-auths
./gradlew clean build
docker build -t magic-cloud-auths .
docker tag magic-cloud-auths <username_docker>/magic-cloud-auths:latest
docker push <username_docker>/magic-cloud-auths:latest
kubectl apply -f magic-cloud-auths-deployment.yml
```

Database service : 
```
cd ../postgres
docker build -t custom-postgres:10.1 .
docker tag custom-postgres:10.1 <username_docker>/custom-postgres:10.1
docker push <username_docker>/custom-postgres:10.1
kubectl apply -f postgres-secret.yaml    
kubectl apply -f configmap.yaml       
kubectl apply -f postgres-deployment.yaml   
kubectl apply -f postgres-service.yaml
```

Final commands : 
```
minikube tunnel
minikube service magic-cloud --url
```
