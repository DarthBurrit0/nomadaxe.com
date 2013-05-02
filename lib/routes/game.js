
var browserify = require('browserify')
  , path = require('path')

module.exports = bundle

function bundle(req, res){
  if (req.method !== 'GET') return res.error(405)

  var bundle = browserify()

  bundle.add(path.join(__dirname, '..', '..', 'browser', 'pixi.js'))
  bundle.add(path.join(__dirname, '..', '..', 'browser', 'client.js'))

  res.statusCode = 200
  res.setHeader('content-type', 'application/javascript')
  bundle.bundle({debug: true}, function (err, src) {
    res.end(src)
  })
}
