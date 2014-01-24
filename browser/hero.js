
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

  hero.speed = 256/1000/2.5 // pixels per second? divided by 2.5

  hero.frame = 0
  hero.delta = 0
  hero.framerate = 250
  hero.animation = [ 2, 1 ] // default y position in the sprite sheet

  hero.width = 32
  hero.height = 32

  // start in the middle
  hero.x = canvas.width/2 - hero.width/2
  hero.y = canvas.height/2 - hero.width/2

  hero.keys = {}

  hero.direction = 'down'

  EE.call(hero)

  loaded(hero.img, function(err){
    if (err) console.error('TODO', err)

    hero.emit('ready')
  })

  hero.attach(canvas)
}

inherits(Hero, EE)

// Attach user input events to an `element` and modify the hero
Hero.prototype.attach = function(element){
  var hero = this

  window.addEventListener('keydown', function(event){
    event.preventDefault()
    hero.keys[event.keyCode] = true
  })

  window.addEventListener('keyup', function(event){
    hero.animation = hero.idleAnimation(event.keyCode)
    delete hero.keys[event.keyCode]
  })
}

Hero.prototype.idleAnimation = function(keyCode){
  var hero = this
  var animation = hero.animation //default

  // up
  if (38 === keyCode || 87 === keyCode) animation = [ 4 * 32, 0 ]
  // down
  if (40 === keyCode || 83 === keyCode) animation = [ 2 * 32, 0 ]
  // right
  if (39 === keyCode || 68 === keyCode) animation = [ 1 * 32, 0 ]
  // left
  if (37 === keyCode || 65 === keyCode) animation = [ 3 * 32, 0 ]

  return animation

}

// is the user wanting to go a certain direction?
Hero.prototype.pressed = function(direction){
  var keys = this.keys
  var matches = false

  if ((38 in keys || 87 in keys) && direction === 'up') matches = true
  if ((40 in keys || 83 in keys) && direction === 'down') matches = true
  if ((39 in keys || 68 in keys) && direction === 'right') matches = true
  if ((37 in keys || 65 in keys) && direction === 'left') matches = true
  if ((74 in keys) && direction === 'attack') matches = true

  return matches
}

Hero.prototype.draw = function(context, delta){
  var hero = this
  var animation = hero.animation

  if (hero.delta > hero.framerate) {
      hero.delta = 0
      hero.frame++
     if (hero.frame >= animation[1]) hero.frame = 0
  } else { hero.delta += delta }

  if (hero.pressed('up')) hero.move('up', delta)
  if (hero.pressed('down')) hero.move('down', delta)
  if (hero.pressed('right')) hero.move('right', delta)
  if (hero.pressed('left')) hero.move('left', delta)

  if (hero.pressed('attack')) {
    context.beginPath()
    context.rect(hero.x, hero.y, hero.width, hero.height)
    context.lineWidth = 1
    context.strokeStyle = 'magenta'
    context.stroke()
  }

  context.drawImage(hero.img
  , hero.frame * 32
  , hero.animation[0]
  , hero.width
  , hero.height
  , hero.x
  , hero.y
  , hero.width
  , hero.height
  )
}

Hero.prototype.move = function(direction, delta){
  var hero = this
  switch (direction) {
    case 'up':
      hero.y -= hero.speed * delta
      hero.animation = [ 4 * 32, 2 ]
      break
    case 'down':
      hero.y += hero.speed * delta
      hero.animation = [ 2 * 32, 2 ]
      break
    case 'right':
      hero.x += hero.speed * delta
      hero.animation = [ 1 * 32, 2 ]
      break
    case 'left':
      hero.x -= hero.speed * delta
      hero.animation = [ 3 * 32, 2 ]
      break
  }
}
