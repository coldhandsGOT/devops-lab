# Answers

Lastname: Foughali
Firstname: Idris

## 2.2
command:
docker build . -t app
# Successfully built 953284872dd0

docker run -d --name app -p 10.0.75.1:4000:4000 953284872dd0


## 2.3
question:
The connection fails because not only we don't have the correct ip address, but also because the ports arent open yet in our dockerfile (Expose 3000, 3306)
So we first get the IP address of the container/NAT IP address in my case, since I'm on windows, then we use it for postman.

command:
## we'll be using the same command as in 2.2, because the standard command isn't that useful
docker run -d --name app -p 10.0.75.1:4000:4000 953284872dd0

#if container already exists: 
docker rm ce858af6b38df13a7a0fb18ddd0738d1c1182f348940ddae9103ba5274ec86a2  
#then we reinitiate the docker run command

## 2.5
question:
command:
		
docker login --username idrisfoughali --password Coldhand8931172
docker ps
# container id : 2a4562890bdd 
docker commit 2a4562890bdd nodejsdock
docker tag nodejsdock idrisfoughali/zoocontainer
docker push idrisfoughali/zoocontainer

## 2.6
command:


question:
command:

command:

## 2.7
question:
question:
command:

command:

## 2.8
question:
output:

## 3.1
command:

## 3.4
command:
command:
