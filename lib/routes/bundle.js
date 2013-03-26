
var browserify = require('browserify')
  , path = require('path')

module.exports = bundle

function bundle(req, res){
  if (req.method !== 'GET') return res.error(405)

  var bundle = browserify({ exports: 'require' })

  bundle.addEntry(path.join(__dirname, '..', '..', 'browser', 'pixi.js'))
  bundle.addEntry(path.join(__dirname, '..', '..', 'browser', 'client.js'))

  res.statusCode = 200
  res.setHeader('content-type', 'application/javascript')
  res.end(bundle.bundle())
}
