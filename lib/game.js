
var domready = require('domready')
  , shoe = require('shoe')
  , sock = shoe('/sock')
  , $qs = document.querySelector.bind(document)
  , iio = require('./vendor/iio-engine')
  , user = require('./user-input')

function resizeCanvas(c) {
  c.width  = window.innerWidth
  c.height = window.innerHeight
}

domready(function(){
  iio.start(function(io){
    io.addObj(new iio.ioText('The darkest depths await your blade.', io.canvas.center)
    .setFont('18px monaco')
    .setTextAlign('center')
    .setFillStyle('black'))

    user(io.canvas)
    .on('tap', onTap)
    .on('hold', onHold)

    var hero
      , sprites

    sprites = new iio.ioSpriteMap('/images/sprites/hero.png', 64, 64, function(){
      hero = new iio.ioRect(io.canvas.center, 64)
      .createWithAnim(sprites.getSprite(0, 0),'still')
      .enableKinematics()

      hero.addAnim(sprites.getSprite(6, 7), 'walk-right')
      hero.addAnim(sprites.getSprite(2, 3), 'walk-left')
      hero.addAnim(sprites.getSprite(4, 5), 'walk-up')
      hero.addAnim(sprites.getSprite(0, 1), 'walk-down')

      io.addObj(hero)
    })

    var animating = false
      , trap = require('mousetrap')

    trap.bind('right', function(e){
      // console.log('right')
      hero.playAnim('walk-right', 12, io)
      hero.setVel(8, 0)
    })

    trap.bind('left', function(e){
      // console.log('left')
      hero.playAnim('walk-left', 12, io)
      hero.setVel(-8, 0)
    })

    trap.bind('up', function(e){
      // console.log('left')
      hero.playAnim('walk-up', 12, io)
      hero.setVel(0, -8)
    })

    trap.bind('down', function(e){
      // console.log('left')
      hero.playAnim('walk-down', 12, io)
      hero.setVel(0, 8)
    })

    trap.bind('right', stop, 'keyup')
    trap.bind('left', stop, 'keyup')
    trap.bind('up', stop, 'keyup')
    trap.bind('down', stop, 'keyup')

    function stop(){
      // console.log('stopping animation')
      hero.stopAnim('still', io.context)
      animating = false
    }
  })

  // var interactive = true
  // var stage = new PIXI.Stage(0x000000, interactive)
  // var renderer = PIXI.autoDetectRenderer(620, 400)
  // document.body.appendChild(renderer.view)

  // requestAnimFrame( animate )
  // var bear = PIXI.Sprite.fromImage("/images/256_Bear_Walk.png")

  // stage.addChild(bear)

  // function animate() {
  //   requestAnimFrame( animate )
  //   renderer.render(stage)
  // }

  // sock.on('data', function(data){
  //   console.log(data)
  // })
})

function onTap(x, y){
  console.log('tap', x, y)
}

function onHold(){
  console.log('hold')
}
