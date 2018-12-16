# Answers

Lastname: Foughali
Firstname: Idris

## 2.2
command:
docker build . -t webapp
# Successfully built 953284872dd0

docker run -p 10.0.75.1:5000:5000 webapp
#or since it's only for testing purposes:
docker run webapp

## 2.3
question:
The connection is supposed to fail, but since I had already configured my dockerfile to contain the Expose ports 5000 for my api and 3306 for my database
So we first get the IP address of the container/NAT IP address in my case, since I'm on windows, then we use it for postman.

command:
## we'll be using almost the same command as in 2.2, because the standard command isn't that useful when interacting with an API, in detached mode
docker run -d -p 10.0.75.1:5000:5000 webapp

## 2.5
question:
command:
		
docker login --username idrisfoughali --password PASSWORD
docker ps
# container id : 2a4562890bdd 
docker commit webapp nodejsdock
docker tag nodejsdock idrisfoughali/zoocontainer
docker push idrisfoughali/zoocontainer

## 2.6
command:
#list all images
docker image ls
#delete images by id, to be done for all existing images (different ids)
docker rmi -f <id of image>
docker ps -a
docker rm -f <id of container>

question: we did not need to build the app from scratch, since it has already been built and uplodaed. So it was ready to be deployed.
command:
docker pull idrisfoughali/zoocontainer

docker run -p 10.0.75.1:5000:5000 idrisfoughali/zoocontainer


## 2.7
question: The name of my container is app, we can check if it's running or not by issuing a "docker stats" or "docker ps" command, since the name of our container is app, we can easily find it
command:
#well, we can use sever commands for that:
#shows running containers
docker stats
#shows all containers even if stopped
docker ps -a 
#shows name and id of container
docker ps -a --format "table {{.ID}}\t{{.Names}}"

#or simply:
docker ps

command:
docker container rename idrisfoughali/zoocontainer zoocontainer
docker tag idrisfoughali/zoocontainer zoocontainer

## 2.8
question: The OS from the container is a debian GNU/Linux 9
output:
docker run -it zoocontainer /bin/bash

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
