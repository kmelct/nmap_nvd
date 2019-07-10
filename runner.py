import sys
import subprocess
import os
import json
from parse import parsers

if len(sys.argv) < 2:
    print('Error! URL is not specified!')
    exit(1)

url = sys.argv[1]
print('URL:', url)
print('RUN Nmap search...')

# Nmap search
# nmap -T4 -A -v -sV -oX - ${url}
p = subprocess.Popen(["nmap", "-T4", "-A", "-v", "-sV", "-oX", "-", url], stdout=subprocess.PIPE,
                     stderr=subprocess.STDOUT)
stdout, stderr = p.communicate()
# print(stdout)
# print(stderr)
with open('output.xml', 'w') as file:
    file.write(stdout)

print('Scanning...')
res = parsers.nmap_xml_parse('output.xml', 10000, 'xml')
print('--------')
print('Result:')
print(json.dumps(res))
