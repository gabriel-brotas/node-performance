FROM node:16.13.0-slim

RUN apt update && apt install -y 

RUN npm install -g npm@8.13.2
COPY package*.json .
RUN npm install

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f" , "/dev/null" ]