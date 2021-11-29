import requests
import csv
import json
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(total=5, backoff_factor=1)
session.mount('https://', HTTPAdapter(max_retries=retries))
url = 'https://www.salestaxhandbook.com/api/'

with open('zip-codes.csv', mode = 'r') as file:
    reader = csv.reader(file)

    with open('zip-tax-rate.csv', mode = 'w', newline='') as taxFile:
        writer = csv.writer(taxFile)

        for lines in reader:
            x = json.loads(session.get(url + lines[0]).text)
            
            taxPercent = x.get('CombinedRate')
            if (taxPercent == '' or taxPercent == None):
                taxPercent = 0.0
            
            data = lines[0], taxPercent
            writer.writerow(data)
            print(data)