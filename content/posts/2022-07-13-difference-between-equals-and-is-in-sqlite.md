---
title: The difference between "=" and "IS" in SQLite
url: /difference-between-equals-and-is-in-sqlite/
date: 2022-07-13
---

_In short: SQLite's `=` (also written `==`) and `IS` operators are very similar, but behave differently around `NULL`. In my opinion, `IS` is easier to understand._

SQLite has two equality operators: `=` and `IS` (`=` can also be written as `==`). They're very similar, except when `NULL` is involved.

From [SQLite's docs][docs]:

> The `IS` and `IS NOT` operators work like `=` and `!=` except when one or both of the operands are NULL. In this case, if both operands are NULL, then the IS operator evaluates to 1 (true) and the IS NOT operator evaluates to 0 (false). If one operand is NULL and the other is not, then the IS operator evaluates to 0 (false) and the IS NOT operator is 1 (true). It is not possible for an IS or IS NOT expression to evaluate to NULL.

Let's see some examples.

They behave the same when neither value is `NULL`:

```sql
SELECT 1 IS 1;  -- 1
SELECT 1 = 1;   -- 1

SELECT 1 IS 2;  -- 0
SELECT 1 = 2;   -- 0
```

However, when `NULL` is involved, `=` will always return `NULL`, not 0 or 1. `IS` will continue to return 0 or 1.

```sql
SELECT 1 IS NULL;     -- 0
SELECT 1 = NULL;      -- NULL

SELECT NULL IS 1;     -- 0
SELECT NULL = 1;      -- NULL

SELECT NULL IS NULL;  -- 1
SELECT NULL = NULL;   -- NULL
```

For a more realistic example, let's say we have a table, `people`, like this:

| `person` | `favorite_color` |
| -------- | ---------------- |
| Keith    | red              |
| Jo       | `NULL`           |
| Mira     | blue             |

Let's say we want to find all the people who don't have a favorite color.

`IS` behaves as you might expect, returning "Jo":

```sql
SELECT person FROM people WHERE favorite_color IS NULL;
-- Jo
```

However, because `=` returns `NULL` when `NULL` is in the expression, no rows are returned!

```sql
SELECT person FROM people WHERE favorite_color = NULL;
-- No results!
```

I think `IS` is easier to understand than `=`, so I'd recommend using it if you're not sure which to use.

Hope this helps!

_Thanks to my colleagues Max and [Scott][] for their help with this post!_

[docs]: https://sqlite.org/lang_expr.html
[scott]: https://scottnonnenberg.com/
