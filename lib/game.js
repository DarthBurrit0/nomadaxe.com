
var domready = require('domready')
  , shoe = require('shoe')
  , sock = shoe('/sock')
  , $qs = document.querySelector.bind(document)
  , iio = require('./vendor/iio-engine')

function resizeCanvas(c) {
  c.width  = window.innerWidth
  c.height = window.innerHeight
}

function initEvents(c) {
  window.addEventListener('resize', resizeCanvas, false)
  c.addEventListener('touchstart', touchDown, false)
  c.addEventListener('touchmove', touchMove, true)
  c.addEventListener('touchend', touchUp, false)
}

function touchDown() {
  console.log('touch down')
}

function touchUp() {
  console.log('touch up')
}

function touchMove() {
  console.log('touch xy')
}

domready(function(){
  iio.start(function(io){
    io.addObj(new iio.ioText('The darkest depths await your blade.', io.canvas.center)
    .setFont('18px monaco')
    .setTextAlign('center')
    .setFillStyle('black'));
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

