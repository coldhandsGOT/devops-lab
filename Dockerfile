FROM node:8.14.0-stretch

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install express
RUN npm install mysql

ENV MYSQL_HOST=host.docker.internal
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=nodejs
ENV MYSQL_PORT=3306

EXPOSE 3000
EXPOSE 3306

COPY index.js /usr/src/app

CMD node index.js