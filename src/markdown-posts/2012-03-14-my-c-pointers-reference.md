---
title: My C++ pointers reference
author: Evan Hahn
layout: post
path: /my-c-pointers-reference/
---

In one of my C++ classes, we went over pointers and references. Because this stuff isn't second-nature to me, I made a little cheat-sheet, which is here if you'd like.

## Declare a pointer

    int * foo;

## Referencify

    int foo = 5;
    int * bar;
    bar = &foo;
    // *bar = 5
    foo = 6;
    // *bar = 6

## Dereferencing

    int * foo;
    *foo = 5;
    *foo = 10;

## Function pointers

    int (*foo)(int int) is a function that returns an integer and takes 2
    foo = min;
    foo = add;

## Declaring arrays

    int array[5];

## C strings

    char a[] = "foo";
