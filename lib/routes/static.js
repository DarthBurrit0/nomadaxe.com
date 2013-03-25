var st = require('st')
var mount = st(process.cwd())

module.exports = static
function static(req, res) {
  if (!mount(req, res)) return res.error(404)
}
