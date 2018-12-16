# Answers

Lastname: Foughali
Firstname: Idris

## 2.2
command:
docker build . -t app
# Successfully built 953284872dd0

docker run -d --name app -p 10.0.75.1:4000:4000 953284872dd0
#or
docker run -d --expose 4000 2046ce5a5c52

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
		
docker login --username idrisfoughali --password PASSWORD
docker ps
# container id : 2a4562890bdd 
docker commit 2a4562890bdd nodejsdock
docker tag nodejsdock idrisfoughali/zoocontainer
docker push idrisfoughali/zoocontainer

## 2.6
command:
#list all images
docker image ls
#delete images by id, to be done for all existing images (different ids)
docker rmi -f 2046ce5a5c52

question: we did not need to build the app from scratch, since it has already been built and uplodaed. So it was ready to be deployed.
command:
docker pull idrisfoughali/zoocontainer
docker run -d --name app -p 10.0.75.1:4000:4000 2046ce5a5c52


command:

## 2.7
question: The name of my container is app, we can check if it's running or not by issuing a "docker stats" or "docker ps" command, since the name of our container is app, we can easily find it
command:
docker stats
#or
docker ps

command:
docker container rename app zoocontainer

## 2.8
question: The OS from the container is a debian GNU/Linux 9
output:
docker run -it 2046ce5a5c52 /bin/bash

root@95c0a606b7da:/usr/src/app# cat /etc/*release
PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
NAME="Debian GNU/Linux"
VERSION_ID="9"
VERSION="9 (stretch)"
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
root@95c0a606b7da:/usr/src/app#


## 3.1
command:

## 3.4
command:
command:
