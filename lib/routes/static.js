var st = require('st')
  , path = require('path')
  , mount = st({ path: path.resolve(__dirname, '../../public')
    , url: '/'
    })

module.exports = static

function static(req, res) {
  if (!mount(req, res)) return res.error(404)
}
