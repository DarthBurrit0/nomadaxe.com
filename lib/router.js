
var routes = require('routes')
  , router = new routes.Router()
  , path = require('path')

add('/', 'home')
add('/bundle.*', 'bundle')

module.exports = router

function add(route, module){
  router.addRoute(route, require(path.join(__dirname, 'routes', module)))
}
