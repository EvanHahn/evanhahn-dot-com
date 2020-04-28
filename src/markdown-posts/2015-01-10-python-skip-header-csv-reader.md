---
title: Skip the header of a file with Python's CSV reader
layout: post
path: /python-skip-header-csv-reader/
---

I was choosing a new credit card and was between two options. One of them offered cash back on all purchases. The other offered _less_ cash back on all purchases but _much more cash back_ on certain purchases. I wanted to know: which credit card was better based on my purchase history? Like any normal person, I exported my transactions as CSV and began to dig around with Python.

My CSV file had a header on the first line, which was different from the rest. The file looked something like this (not my actual transactions):

```
Date,Description,Amount
2015-01-03,Cakes,22.55
2014-12-28,Rent,1000
2014-12-27,Candy Shop,12
...
```

I wanted to use [Python's built-in CSV reader class](https://docs.python.org/2/library/csv.html#csv.reader) and skip any parsing of the header line. So I did this:

```
with open('mycsv.csv', 'r') as csvfile:

    csvreader = csv.reader(csvfile)

    # This skips the first row of the CSV file.
    # csvreader.next() also works in Python 2.
    next(csvreader)

    for row in csvreader:
        # do stuff with rows...
```

The call to `next` reads the first row and discards it. From there, we're ready to iterate through the actual data! One small caveat: I had issues in Python 3 when opening the file in binary mode (`rb` instead of `r`).

This trick helped me choose my credit card and may help you do the same with CSVs in Python!
