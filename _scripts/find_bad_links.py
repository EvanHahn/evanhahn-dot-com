import os
import requests
from bs4 import BeautifulSoup


def check(filename):
    print 'Checking ' + filename + '...'
    with open(filename) as file:
        soup = BeautifulSoup(file.read())
        links = soup.find_all('a')
        for link in links:
            href = link.get('href')
            if href[0:4] == 'http':
                code = requests.get(href, verify=False).status_code
                if code != 200:
                    print str(code) + ' in ' + filename


def crawl(folder):
    file_list = os.listdir(folder)
    for filename in file_list:
        filename = os.path.join(folder, filename)
        if os.path.isdir(filename):
            crawl(filename)
        elif filename[-5:] == '.html':
            check(filename)


if __name__ == '__main__':
    start_directory = os.path.relpath('../_site/')

    crawl(start_directory)
