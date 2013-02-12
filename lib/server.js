var god  = require('./god'); // god is an event emitter.

god.on('character:created', function (message) {
    console.log('Character has been created!!!');
    console.log(message);
});

god.on('item:created', function (message) {
    console.log('Item has been created!!!');
    console.log(message);
});

var c = god.create('character');
var i = god.create('item');

var http = require('http')
  , url = require('url')
  , router = require('./router')
  , EP = require('error-page')
  , beardo = require('beardo')
  , shoe = require('shoe')

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
