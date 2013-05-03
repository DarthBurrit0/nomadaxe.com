
var bunyan = require('bunyan')
  , logger = bunyan.createLogger({ name: 'nomadaxe.com'
    , serializers: bunyan.stdSerializers
    })

module.exports = function(config){
  var server = require('http')
      .createServer(handler)
    , shoe = require('shoe')
    , sock = shoe(echo)

  logger.level(config['log-level'] || 'info')

  sock.install(server, '/sock')

  return server
}

function handler(req, res){
  var pathname = require('url')
      .parse(req.url)
      .pathname
    , route = require('./router')
      .match(pathname)

  if (route) Object.keys(route).forEach(function(k){ req[k] = route[k] })

  var reqID = require('crypto')
      .randomBytes(6)
      .toString('hex')

  res.setHeader('x-request-id', reqID)

  req.log = res.log = logger.child({ 'request-id': reqID })

  req.log.debug({ req: req }, 'request started')

  res.on('finish', function(){
    req.log.info({ req: req
    , res: res
    }, 'response sent')
  })

  res.template = require('beardo').handler(req, res)

  var EP = require('error-page')

  res.error = EP(req, res, { debug: true
  , log: function(){}
  })

  var haiku = require('haiku')
    , path = require('path')

  res.haiku = haiku(req, res, { src: path.resolve(__dirname, '../') })

  if (! route) return res.error(404)
  else return route.fn(req, res)
}

function echo(stream){
  stream.write('Hello from the server')
}
