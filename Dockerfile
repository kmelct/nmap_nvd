FROM node:alpine

RUN apk add --no-cache \
    nmap \ 
    nmap-scripts --virtual deps \
    python \
    build-base \
    && apk del deps && rm -f /var/cache/apk/*

RUN mkdir /nmap
VOLUME ["/nmap"]
WORKDIR /nmap

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT ["node", "index.js"]