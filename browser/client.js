
var domready = require('domready')
  , shoe = require('shoe')
  , sock = shoe('/sock')
  , $qs = document.querySelector.bind(document)

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
  var canvas = $qs('#app')
    , ctx = canvas.getContext('2d')

  initEvents(canvas)
  resizeCanvas(canvas)

  console.log('Where am I?')

  sock.on('data', function(data){
    console.log(data)
  })
})


