
var inherits = require('inherits')
var EE = require('events').EventEmitter
var loaded = require('image-loaded')

module.exports = function(canvas){
  return new Hero(canvas)
}

/*

Events:

* ready: hero sprite is loaded

*/
function Hero(canvas){
  var hero = this

  hero.img = document.createElement('img')
  hero.img.src = '/images/hero.png'

  hero.speed = 256/1000 // pixels per second?

  // start in the middle
  hero.x = canvas.width/2
  hero.y = canvas.height/2

  hero.keys = {}

  EE.call(hero)

  loaded(hero.img, function(err){
    hero.emit('ready')
  })

  hero.attach(canvas)
}

inherits(Hero, EE)

// Attach user input events to an `element` and modify the hero
Hero.prototype.attach = function(element){
  var hero = this

  window.addEventListener('keydown', function(event){
    hero.keys[event.keyCode] = true
  })

  window.addEventListener('keyup', function(event){
    delete hero.keys[event.keyCode]
  })
}

// is the user wanting to go a certain direction?
Hero.prototype.pressed = function(direction){
  var keys = this.keys
  var matches = false

  if ((38 in keys || 87 in keys) && direction === 'up') matches = true
  if ((40 in keys || 83 in keys) && direction === 'down') matches = true
  if ((39 in keys || 68 in keys) && direction === 'right') matches = true
  if ((37 in keys || 65 in keys) && direction === 'left') matches = true

  return matches
}

Hero.prototype.draw = function(context, delta){
  var hero = this

  if (hero.pressed('up')) hero.y -= hero.speed * delta
  if (hero.pressed('down')) hero.y += hero.speed * delta
  if (hero.pressed('right')) hero.x += hero.speed * delta
  if (hero.pressed('left')) hero.x -= hero.speed * delta

  context.drawImage(hero.img, hero.x, hero.y)
}
