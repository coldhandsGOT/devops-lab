FROM node:8.14.0-stretch

RUN mkdir -p /usr/src/webapp
WORKDIR /usr/src/webapp

RUN npm install express
RUN npm install mysql

ENV MYSQL_HOST=host.docker.internal
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DATABASE=nodejs
ENV MYSQL_PORT=3306

EXPOSE 5000
EXPOSE 3306

COPY index.js /usr/src/webapp
CMD node index.js