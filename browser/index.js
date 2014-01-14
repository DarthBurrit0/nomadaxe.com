
var domready = require('domready')
var raf = require('raf')
var hero = require('./hero')

domready(function(){
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')

  canvas.style.border = '1px solid magenta'

  raf(canvas).on('data', draw)

  var player = hero(canvas)

  function draw(delta) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    player.draw(ctx, delta)
  }
})

