express = require "express"
resolve = require("path").resolve

app = express()

use = (name, options = {}) ->
  path = resolve(__dirname, "static")
  app.use "/#{name}", express.static(path, options)

use "normal"

use "noetag", { etag: no }

use "noindex", { index: no }

use "otherindex", { index: "other-index.html" }

use "priorityindex", { index: ["index.html", "other-index.html"] }

use "hidden", { hidden: yes }

app.use (req, res) ->
  res.type "text"
  res.status 404
  res.send "Not found!"

port = 1337
app.listen port, (err) ->
  throw err if err
  console.log "app started on #{port}"
