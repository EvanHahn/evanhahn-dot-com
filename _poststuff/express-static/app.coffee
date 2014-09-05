express = require "express"
logger = require "morgan"
resolve = require("path").resolve
noheaders = require "./noheaders"

app = express()

use = (name, options = {}) ->
  path = resolve(__dirname, "static")
  app.use "/#{name}", express.static(path, options)

app.use logger("dev")

use "normal"

use "noetag", { etag: no }

use "noindex", { index: no }

use "otherindex", { index: "other-index.html" }

use "priorityindex", { index: ["index.html", "other-index.html"] }

use "hidden", { hidden: yes }

use "customs",
  setHeaders: (res, path) ->
    res.attachment(path)
    res.removeHeader('Cache-Control')

app.use "/noheaders", noheaders

app.use (req, res) ->
  res.type "text"
  res.status 404
  res.send "Not found!"

port = 1337
app.listen port, (err) ->
  throw err if err
  console.log "app started on #{port}"
