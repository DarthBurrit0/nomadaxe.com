var domready = require('domready')
var loaded = require('image-loaded')
var raf = require('raf')

domready(function(){
  console.log('dom loaded')

  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')

  canvas.height = document.height
  canvas.width = document.width

  canvas.addEventListener('click', click)

  raf(canvas).on('data', draw)

  var image = document.createElement('img')
  image.src = '/images/hero.png'

  var ready = false

  loaded(image, function(err){
  	if (err) return console.error(err)
      ready = true
  })

  var x = canvas.width/2
  var y = canvas.height/2

  function draw() {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, x, y)
 }

  function click(event) {
    x = event.x
    y = event.y
  }

})

