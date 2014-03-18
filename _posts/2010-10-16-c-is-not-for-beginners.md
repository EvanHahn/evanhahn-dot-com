---
title: C++ is not for beginners!
author: Evan Hahn
layout: post
permalink: /c-is-not-for-beginners/
---
*In short: C++ is not a good beginner's programming language. It requires the programmer to take more control over things, which a newbie wouldn't understand. A "hello world" has confusing parts. Its online documentation is too varied and too terrible.*

At Michigan's College of Engineering, we're required to take an introductory programming course. I'm helping out my classmates left and right — almost daily — because they're clueless about how to program.

I blame the fact that they have to learn C++. I could understand it in the accelerated level, but it makes no sense to me why the Michigan powers that be chose C++ instead of something simpler, like Python.

C++ is a marvelous language for a variety of reasons, but it should not be taught as an introductory language.

Imagine explaining a BASIC "hello world" program to someone. It'd be pretty simple. To explain a C++ Hello World, one must explain what an I/O Stream is, define `using namespace std`, explain a main function, describe return values, and teach people how to pilot a 747 if they have gone blind.

C++ requires the programmer to take control of things that a beginner really doesn't understand. Programmers have to do more work to make the compiler do what they want. While having more control is often a good thing, a newbie probably doesn't understand `#includes` or `main()` functions (if they understand functions at all). Having to typecast in order to use the `cmath pow()` function with integers seems too confusing for an introductory course.

C++'s online documentation is also rather god-awful. There are several popular C++ compilers that do different things, so copy-pasting code out of Visual Studio into a G++ compiler will yield errors; this means that the internet's example code will frequently fail. There are a plethora of ways to implement arrays and member functions. Some examples may be ugly but efficient while others may be clean and slow. Poor documentation makes it infinitely harder for the beginner (and, frankly, for anyone).

I'll reiterate that I'm not knocking C++, but I am objecting to my university requiring beginners to learn it.
