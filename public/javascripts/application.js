
var canvas = document.getElementById('game')
  , context = canvas.getContext('2d')
  , backgroundReady
  , backgroundIMG = new Image()
;

backgroundIMG.onload = function(){
  backgroundReady = true
}

backgroundIMG.src = '/images/background.png'

var render = function(){
  if (backgroundReady) context.drawImage(backgroundIMG, 0, 0, 512, 480)
}

var main = function(){
  var then = then || Date.now()
  var now = Date.now()
  var delta = now - then

  // update(delta / 1000)
  render();

  then = now;
}

setInterval(main, 1)
