FROM alpine:latest

RUN apk --update add python py-pip nmap nmap-scripts && rm -f /var/cache/apk/*

RUN pip install requests

RUN mkdir /nmap
VOLUME ["/nmap"]
WORKDIR /nmap

COPY . .

ENTRYPOINT ["python", "runner.py"]