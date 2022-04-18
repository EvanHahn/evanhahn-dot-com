---
date: 2015-01-10
title: Skip the header of a file with Python's CSV reader
description: "next(csvreader) does the trick."
layout: post
url: /python-skip-header-csv-reader/
---

_In short: use `next(csvreader)`._

Let's say you have a CSV like this, which you're trying to parse with Python:

```csv
Date,Description,Amount
2015-01-03,Cakes,22.55
2014-12-28,Rent,1000
2014-12-27,Candy Shop,12
...
```

You don't want to parse the first row as data, so you can skip it with `next`. For example:

```python
with open("mycsv.csv", "r") as csvfile:
    csvreader = csv.reader(csvfile)

    # This skips the first row of the CSV file.
    next(csvreader)

    for row in csvreader:
        # do stuff with rows...
```

The call to `next` reads the first row and discards it. From there, you're ready to iterate through the actual data.

You may instead wish to use a [`DictReader`][dictreader], which parses the first row as field names by default. For example:

```python
with open("mycsv.csv", "r") as csvfile:
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        print(row["Date"], row["Description"], row["Amount"])
```

Either way, you've now skipped the first row of a CSV file in Python!

[dictreader]: https://docs.python.org/3/library/csv.html#csv.DictReader
