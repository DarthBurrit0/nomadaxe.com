
var path = require('path')


module.exports = json 

function json(req, res){
  if (req.method !== 'GET') return res.error(405)

    console.log(req);
    var type = req.params.type
    , file = req.params.file + '.json'
    , json = require(path.join(__dirname, '..', '..', 'data', type, file))

  res.statusCode = 200
  res.setHeader('content-type', 'application/json')
  res.end(JSON.stringify(json))
}
