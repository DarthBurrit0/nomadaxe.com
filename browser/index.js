
var domready = require('domready')
var raf = require('raf')
var hero = require('./hero')

domready(function(){
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('resize', resize)

  raf(canvas).on('data', draw)

  var player = hero(canvas)

  function draw(delta) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    player.draw(ctx, delta)
  }

  function resize(event){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
})

