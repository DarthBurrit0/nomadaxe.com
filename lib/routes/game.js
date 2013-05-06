
var browserify = require('browserify')
  , path = require('path')

module.exports = function(req, res){
  if (req.method !== 'GET') return res.error(405)

  res.setHeader('content-type', 'application/javascript')

  browserify()
  .add(path.resolve(__dirname, '../game.js'))
  .bundle()
  .pipe(res)
}
