#!/usr/bin/env node

var server = require('../lib/server')
  , config = { port: 8080 }

server.listen(config.port)
