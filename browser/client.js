
var domready = require('domready')
  , shoe = require('shoe')
  , sock = shoe('/sock')
  , Stats = require('./stats')
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

function initStats() {
  var stats = new Stats()
  stats.setMode(1)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  document.body.appendChild(stats.domElement)

  return stats
}

domready(function(){
  var canvas = $qs('#app')
    , ctx = canvas.getContext('2d')
    , stats

  initEvents(canvas)
  resizeCanvas(canvas)
  stats = initStats()

  console.log('Where am I?')

  sock.on('data', function(data){
    console.log(data)
  })

  setInterval( function () {
    stats.begin()
    console.log('tick')
    stats.end()
  }, 1000/60);
})


