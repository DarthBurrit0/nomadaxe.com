
var routes = require('routes')
  , router = new routes.Router()
  , path = require('path')

add('/', 'home')
add('/public/*?', 'static')
add('/bundle.*', 'bundle')

module.exports = router

function add(route, module){
  var file = path.join(__dirname, 'routes', module)

  router.addRoute(route, require(file))
}
