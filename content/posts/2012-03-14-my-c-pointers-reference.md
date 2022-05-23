---
date: 2012-03-14
title: My C++ pointers reference
author: Evan Hahn
layout: post
url: /my-c-pointers-reference/
---

In one of my C++ courses, we went over pointers and references. Because this stuff isn't second-nature to me, I made a little cheat-sheet, which is here if you'd like.

## Declare a pointer

```cpp
int * foo;
```

## Referencify

```cpp
int foo = 5;
int * bar;
bar = &foo;
// *bar = 5
foo = 6;
// *bar = 6
```

## Dereferencing

```cpp
int * foo;
*foo = 5;
*foo = 10;
```

## Function pointers

```cpp
int (*foo)(int int) // a function that returns an integer and takes 2
foo = min;
foo = add;
```

## Declaring arrays

```cpp
int array[5];
```

## C strings

```cpp
char a[] = "foo";
```
