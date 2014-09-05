express = require "express"
onHeaders = require "on-headers"
{ resolve } = require "path"

module.exports = app = express.Router()

app.use (req, res, next) ->
  onHeaders res, ->
    res.removeHeader "Accept-Ranges"
  next()

app.use express.static(resolve __dirname, "static")
