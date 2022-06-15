---
date: 2012-08-15
title: Private members in CoffeeScript
author: Evan Hahn
layout: post
url: /private-members-in-coffeescript/
---

_In short: stick to the JavaScript convention of prefixing private members with underscores because private members don't work very well._

CoffeeScript can implement private functions, but not other variables. It's a big can of worms and is only elegant in very simple cases. I'll warn you: this gets hairy, and I'd recommend using the JavaScript convention of prefixing private members with `_` and calling it a day.

## Simple functions

In simple cases for functions, it works very well. Take a look at the example below:

```coffeescript
class Person
  sayHello = (to) ->  # Private
    console.log "Hello, #{to}."
  helloWorld: ->
    sayHello("world")

p = new Person
p.helloWorld()  # => "Hello, world."
```

This works just as expected, but it only works for functions that don't talk to `this`. We'll explore how to get things talking to `this` below.

## This fails with non-functions

Unfortunately, we can't have private variables. Take a look at this example:

```coffeescript
class Animal
  firstName = ""  # Private member
  constructor: (n) ->
    firstName = n
  getFirstName: ->
    firstName

jambo = new Animal "Jambo"
console.log jambo.getFirstName()  # => "Jambo"

birch = new Animal "Birch"
console.log birch.getFirstName()  # => "Birch"

console.log jambo.getFirstName()  # => "Birch"  # Not what we want!!
```

If you [take a look at the compiled JavaScript][1], the problem becomes more evident -- the `firstName` variable is "shared" across all instances of the Animal class. Unfortunately, CoffeeScript can't fix this issue for us.

Technically, this behavior is the same for functions, but functions don't really get redefined, so it's okay. If you're ever redefining your functions, then it's dangerous.

Many thanks to [Harry Brundage][2] for pointing this out! I had this wrong.

## Getting functions to work

It's likely that you'll want to have a private function that talks to a class's instance variables. Unfortunately, this won't work:

```coffeescript
class Sorcerer
  constructor: (@spell) ->
  conjureSpell = ->   # private
    @spell.conjure()  # "this" is scoped incorrectly here, so it won't work
  useSpell: ->
    conjureSpell()
    @spell.use()

s = new Sorcerer
  conjure: -> console.log "Brewing potion..."
  use: -> console.log "Now I have superpowers!"

s.useSpell()  # Cannot call method "conjure" of undefined
```

Even if we define `conjureSpell` with [CoffeeScript's fat arrow][3], it doesn't work. This is because `@spell` in `conjureSpell` is undefined -- the scope of `this` is wrong. There are a few ways around this problem, but none of them are very pretty.

- The quickest way around this is to indicate the scope when you're calling a private function. In this case, use `conjureSpell.call(this)` instead ([see an example here][4]). This has the advantage that it also works for public functions -- if you decide that you don't want a function to be private anymore, you don't have to update any code. This is the only solution that [works with inheritance][5] while still maintaining true private variables. (By the way, you might also want to use `apply`, depending on what you're doing. [This StackOverflow answer explains the difference well][6] if you don't know -- it's subtle.)

- Another way effectively implements CoffeeScript's fat arrow by hand. [See an example here.][7] This has the advantage that you don't have to do anything weird when talking to private functions, but you _do_ have to do something weird _inside_ the private functions (and in the constructor). This solution also [breaks inheritance][8] -- child classes with new constructors can do bad things. I'd avoid this solution.

- Another way is to basically define them in the constructor and with the `=>`. [This breaks inheritance][9] like the above example, but it has the advantage that your methods looks totally normal outside of the constructor. I'd avoid this solution as well.

```coffeescript
class Sorcerer
  conjureSpell = null   # Define it up here so it's in scope
  constructor: (@spell) ->
    conjureSpell = =>   # private, note the =>
      @spell.conjure()
  useSpell: ->
    conjureSpell()
    @spell.use()
```

- The way I'd really recommend is abandoning truly private variables altogether and simply prefixing your private stuff with an underscore. That's a JavaScript convention and there's a reason that it's widely used.

## They're private, not protected

Private members are just that: private. As such, we can't access private members in child classes:

```coffeescript
class Person
  sayHello = (to) ->  # Private
    console.log "Hello, #{to}."
  helloWorld: ->
    sayHello("world")

class Employee extends Person
  helloBoss: ->
    sayHello("boss")

e = new Employee
e.helloBoss()  # => ReferenceError: sayHello is not defined
```

As far as I know, you can't make protected members with CoffeeScript classes because JavaScript doesn't really have classical inheritance. If you need them, you'll need to make them public and prefix them with an underscore.

## Some concluding notes

- It's worth noting that this stuff works in JavaScript too. Perhaps the best way to see how these things work is by running them through CoffeeScript's compiler and looking at the compiled JavaScript to get an idea for how it really works.

- I'd also suggest adding a comment indicating which of your variables are private, should you choose to use this flaky feature. I don't think I'd see the difference between `name = ""` and `name: ""` if I were scanning this code, nor do I expect everyone to fully understand this nuanced part of the language.

If this has shown you anything, it's that private members in CoffeeScript are pretty weird, and it's probably easier to prefix your private variables with an underscore.

[1]: https://gist.github.com/3374882
[2]: http://harry.me/
[3]: http://coffeescript.org/#fat_arrow
[4]: https://gist.github.com/3364133
[5]: https://gist.github.com/3364322
[6]: http://stackoverflow.com/a/1986909
[7]: https://gist.github.com/3364153
[8]: https://gist.github.com/3364224
[9]: https://gist.github.com/3364303
