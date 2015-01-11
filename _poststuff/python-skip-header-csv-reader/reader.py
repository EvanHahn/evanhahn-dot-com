import csv

with open('data.csv', 'r') as csvfile:
    csvreader = csv.reader(csvfile)
    next(csvreader)
    for row in csvreader:
        assert(row[0] != 'Date')
