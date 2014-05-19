express = require "express"
logger = require "morgan"

handler = (type) ->
  return (req, res) ->

    output = [
      "Hello from #{type}".toUpperCase()
      ""
      "req.url: #{req.url}"
      "req.originalUrl: #{req.originalUrl}"
      ""
    ]

    if req.route?
      output.push "req.route:", JSON.stringify(req.route, null, "  ")
    else
      output.push "req.route doesn't exist"
      
    res.send output.join("\n")

app = express()

app.use logger("dev")
app.use (req, res, next) ->
  res.type("text/plain")
  next()

app.use "/use-foo/*", handler("use")
app.use "/use-bar", handler("use")

app.all "/all-foo/*", handler("all")
app.all "/all-bar", handler("all")

app.get "/get-foo/*", handler("get")
app.get "/get-bar", handler("get")

app.use handler("nobody")

app.listen 6969, (err) ->
  throw err if err
  console.log "Server started"
