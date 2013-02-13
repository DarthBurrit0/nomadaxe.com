var http = require('http')
  , url = require('url')
  , router = require('./router')
  , EP = require('error-page')
  , beardo = require('beardo')
  , shoe = require('shoe')
  , god = require('./god')

module.exports = function(config){
  var server = http.createServer(handler)
    , sock = shoe(echo)

  sock.install(server, '/sock')

  return server
}

function handler(req, res){
  var pathname = url.parse(req.url).pathname
    , route = router.match(pathname)

  if (route) Object.keys(route).forEach(function(key){
    req[key] = route[key]
  })

  res.template = beardo.handler(req, res)

  res.error = EP(req, res, { debug: true
  , log: function(){}
  })

  if (! route) return res.error(404)
  else route.fn(req, res)
}

function echo(stream){
  stream.write('Hello from the server')
}
