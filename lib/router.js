
var routes = require('routes')
  , router = new routes.Router()

add('/', 'content')
add('/json/:type(mobs|items)/:file', 'json')
add('/posts/*?', 'content')
add('/images/*?', 'static')
add('/bundle*?', 'bundle')
add('/game.js', 'game')
add('/play', 'play')

module.exports = router

function add(route, module){
  var path = require('path')
    , file = path.join(__dirname, 'routes', module)

  router.addRoute(route, require(file))
}
