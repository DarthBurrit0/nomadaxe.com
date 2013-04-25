
var routes = require('routes')
  , router = new routes.Router()

add('/', 'content')
add('/posts/*?', 'content')
add('/public/*?', 'static')
add('/bundle.js', 'bundle')
add('/game.js', 'game')
add('/play', 'play')

module.exports = router

function add(route, module){
  var path = require('path')
    , file = path.join(__dirname, 'routes', module)

  router.addRoute(route, require(file))
}
