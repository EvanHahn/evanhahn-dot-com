---
title: "How to read tab-separated values (TSV) files in Python"
url: "/how-to-read-tsv-files-in-python"
description: "Use the csv module with a tab delimiter."
date: 2022-05-02
---

To read [tab-separated values][0] files with Python, we'll take advantage of the fact that they're similar to [CSVs][1]. We'll use [Python's `csv` library][2] and tell it to split things up with tabs instead of commas. Just set the `delimiter` argument to `"\t"`.

For example, let's say we have the following data in `fruits.tsv`:

```tsv
Name	Color	Ranking
Apple	Red	5
Kiwi	Green	9
Durian	Brown	10
```

You can read it like this:

```python
import csv

with open("fruits.tsv", "r", encoding="utf8") as fruits_file:
    tsv_reader = csv.DictReader(fruits_file, delimiter="\t")
    for fruit in tsv_reader:
        name = fruit["Name"]
        ranking = fruit["Ranking"]
        print(f"{name} is rank {ranking}")
```

Alternatively, you can read things by row:

```python
import csv

with open("fruits.tsv", "r", encoding="utf8") as fruits_file:
    tsv_reader = csv.reader(fruits_file, delimiter="\t")

    # Skip the first row, which is the header
    next(tsv_reader)

    for row in tsv_reader:
        (name, color, ranking) = row
        print(f"{name} is rank {ranking}")
```

That's it! Just tell the `csv` module that it's a file split by tabs, not commas, and you're all set.

[0]: https://en.wikipedia.org/wiki/Tab-separated_values
[1]: https://en.m.wikipedia.org/wiki/Comma-separated_values
[2]: https://docs.python.org/3/library/csv.html
