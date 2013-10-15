var domready = require('domready')
var loaded = require('image-loaded')

domready(function(){
  console.log('dom loaded')

  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')
  console.log(ctx)

  canvas.height = document.height
  canvas.width = document.width

  var image = document.createElement('img')
  image.src = '/images/hero.png'

  loaded(image, function(err){
  	if (err) console.error(err)
  	ctx.drawImage(image, document.width/2, document.height /2)
  })
})
