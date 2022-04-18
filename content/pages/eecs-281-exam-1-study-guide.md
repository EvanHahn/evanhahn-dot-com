---
title: EECS 281 exam 1 study guide
url: /random/eecs-281-exam-1-study-guide
byline: true
---

_This study guide is also available as [Markdown-formatted plain text][1]._

# Complexity

- O is asymptotic/upper bound
- Ω is lower bound
- Θ is tight bound

- Example: 12x² + 12x + 12 = O(x²)

- Amortized analysis: "At the heart of the method is the idea that while certain operations may be extremely costly in resources, they cannot occur at a high-enough frequency to weigh down the entire program because the number of less costly operations will far outnumber the costly ones in the long run, 'paying back' the program over a number of iterations." <https://en.wikipedia.org/wiki/Amortized_analysis>

# Containers

- Array
- Vector: effectively a protected array
- Queues: first in, first out (imagine a queue of people)
- Stacks: are last in, first out (imagine a stack of clothes)
- Priority queue: a queue that holds a sorting method prioritizing elements based on this method (e.g. larger elements come first)
- Singly-linked list: each node holds a pointer to the next element
- Doubly-linked list: each node holds a pointer to the next element AND a pointer to the previous element
- Heaps: <https://youtu.be/v1YUApMYXO4>; a sorted binary tree, basically. To add elements, put it at the end and move it up the tree until its parent is larger, and then stop. To remove top element, delete it and move the last value inside. Then swap it with its larger child until it's larger than its children.

- Iterators are protected ways to access the data inside a container

# Sorts

## Considerations

- Time complexity: O(n), etc.
- Space complexity: do we need extra stuff?
- Stability: if something was already ordered, does the sort disturb that? For example: Juan and Esmeralda have the same birthday. If sorting by birthday, will Juan come before Esmeralda after the sort?

- Best case usually happens when the list is already sorted

## Bubble sort

- Swap adjacent values (when appropriate) until you can't swap no more
- Explanation video: <https://youtu.be/P00xJgWzz2c>
- worst = average = O(n²)
- best = O(n)

## Selection sort

- Swap the biggest and smallest, then do the same for the rest
- Explanation video: <https://youtu.be/6nDMgr0-Yyo>
- worst = average = best = O(n²)

## Insertion sort

- Build a new array by plucking, one by one, out of the array
- Explanation video: <https://youtu.be/c4BRHC7kTaQ>
- worst = average = O(n²)
- best = O(n)
- If already sorted, typically fastest of bubble, selection, or insertion.

## Merge sort

- Break it down and then build it back up
- Explanation video (this blew my mind, by the way): <https://youtu.be/GCae1WNvnZM>
- Explanation GIF: <https://en.wikipedia.org/wiki/File:Merge-sort-example-300px.gif>
- worst = average = best = O(n log n)
- O(1) memory (but can be O(n log n))

## Quicksort

- Pick a pivot and recurse, recurse (or iterate, iterate)
- Explanation video: <https://youtu.be/y_G9BkAm6B8>
- worst = O(n²)
- average = best = O(n log n)
- O(n log n) memory.
- Pick a good pivot!

## Heapsort

- Sort for heaps, we likely don't need to know it, but just in case:
- O(n log n) for all cases.
- O(1) memory

# Searches

- Linear search: basically, start at one end and look through until you find it. O(n).
- Binary search: start in the middle. Then go left or right, depending on whether you should. Only works for sorted lists. O(log n).

# Misc.

- Random access is `[]` operator

# "Top 10 Study Questions"

These come from the end of lecture 3.

1.  Memory ownership for a container is all elements that only it points to.
2.  Disadvantages of arrays: cannot resize
3.  Why do you need const and non const versions of some operators? If you declare a type with const, you may not be able to use some accessor functions that only have type non const.
4.  Number of destructor calls: delete --> ? delete[] --> ?
5.  You could use a pointer based copying algorithm in the instance where you do not know the size so you can just go till null.
6.  C++ strings are not null terminated. C strings are.
7.  Off by one bugs: Going to n instead of n-1. Also called a "fence post error".
8.  To set up a two-dimensional array class: declare one array then iterate through and create a new array at each point.
9.  Perform an amortized complexity analysis of an automatically-resizable container with double policy.
10. Pointers and references for container classes. Pros: do not have to pass large objects; Cons: easy to lose pointers.

[1]: https://evanhahn.com/wp-content/uploads/2012/10/eecs281exam1.txt
