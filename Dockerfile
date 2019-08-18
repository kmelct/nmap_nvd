FROM node:alpine

RUN apk add --no-cache \
    nmap \ 
    nmap-scripts --virtual deps \
    python \
    build-base \
    && npm install \
    && apk del deps && rm -f /var/cache/apk/*

RUN mkdir /nmap
VOLUME ["/nmap"]
WORKDIR /nmap

COPY . .

ENTRYPOINT ["node", "index.js"]