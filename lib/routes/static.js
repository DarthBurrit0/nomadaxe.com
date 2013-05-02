var st = require('st')
  , path = require('path')
  , _path = path.resolve(__dirname, '../../public')
  , mount = st(_path)

module.exports = static

function static(req, res) {
  if (!mount(req, res)) return res.error(404)
}
