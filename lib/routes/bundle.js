
var browserify = require('browserify')
  , path = require('path')

module.exports = bundle

function bundle(req, res){
  if (req.method !== 'GET') return res.error(405)

  switch(req.url){
    case '/bundle.css': return css(req, res)
    case '/bundle.js' : return js(req, res)
    default           : return res.error(404)
  }
}

function js(req, res){
  var bundle = browserify()

  bundle.add(path.join(__dirname, '..', '..', 'browser', 'pixi.js'))
  bundle.add(path.join(__dirname, '..', '..', 'browser', 'client.js'))

  res.statusCode = 200
  res.setHeader('content-type', 'application/javascript')
  bundle.bundle({debug: true}, function (err, src) {
    res.end(src)
  })
}

function css(req, res){
  var rework = require('rework')
    , fs = require('fs')
    , path = require('path')
    , file = path.resolve(__dirname, '../../stylesheets/bundle.css')

  fs.readFile(file, 'utf8', function(err, data){
    if (err) res.error(err)

    var css = rework(data)
    .toString()

    res.writeHead(200, { 'content-type': 'text/css'
    , 'content-length': css.length
    })

    res.write(css)
  })
}
