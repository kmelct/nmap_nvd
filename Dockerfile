FROM node:alpine

RUN apk --update --virtual deps add \
    python \
    build-base \
    py-pip \
    nmap \
    nmap-scripts && rm -f /var/cache/apk/*

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT ["node", "index.js"]