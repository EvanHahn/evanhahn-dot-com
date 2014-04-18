vm = require "vm"
assert = require "assert"

do ->

  food = "bagel"
  result = eval("food = 'burrito';")
  assert result is "burrito"
  assert food is "burrito"

do ->

  eval("var flavor = 'carnitas';")
  assert flavor is "carnitas"

do ->

  burrito = { sourCream: false }
  `with (burrito) {
    sourCream = true;
  }`
  assert burrito.sourCream
  assert typeof sourCream is "undefined"

do ->

  context = vm.createContext({ flour: "tortilla" })
  vm.runInContext("flour = 'corn'", context)
  assert context.flour is "corn"

do ->

  context = vm.createContext({ flour: "tortilla" })
  try
    vm.runInContext "global.taqueria = 'Chipotle'", context
    assert false # we shouldn't get here

do ->

  sandbox = vm.createContext
    burrito:
      sourCream: false
      tortilla: "flour"
      meat: "tofu"

  global.taqueria = "Los Altos Taqueria"

  code = """
  taqueria = "El Grullense";
  burrito.sourCream = true;
  burrito.tortilla = "corn";
  typeOfGlobal = typeof global;
  """

  vm.runInContext(code, sandbox)

  assert sandbox.taqueria = "El Grullense"
  assert sandbox.burrito.sourCream is true
  assert sandbox.burrito.tortilla is "corn"
  assert sandbox.burrito.meat is "tofu"
  assert sandbox.typeOfGlobal is "undefined"
  assert global.taqueria is "Los Altos Taqueria"

  delete global.taqueria

do ->

  box1 = { tortilla: "corn" }
  box2 = vm.createContext({ tortilla: "corn" })
  code = "tortilla = 'flour';"

do ->

  food = 123
  context = vm.createContext({})
  vm.runInContext("me = food", context)
  console.log context
