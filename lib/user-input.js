
var EE = require('events').EventEmitter

module.exports = function(element) {
  var emitter = Object.create(EE.prototype
      , { hold: { value: 400 }
      })
    , noTouch = 'ontouchstart' in document === false

  element.addEventListener('touchstart', start, false)
  element.addEventListener('touchmove', move, false)
  element.addEventListener('touchend', end, false)
  element.addEventListener('touchcancel', cancel, false)

  // pseudo touch events
  if (noTouch) {
    element.addEventListener('mousedown', start, false)
    element.addEventListener('mouseup', end, false)
  }

  return emitter

  function start(event){
    if (noTouch) {
      event.touches = []
      event.touches[0] = { pageX: event.x
      , pageY: event.y
      }
    }

    emitter.x = event.touches[0].pageX
    emitter.y = event.touches[0].pageY
    emitter.started = (new Date).getTime()
    emitter.moving = false

    emitter.timer = setInterval(function(){
      var now = (new Date).getTime()
        , difference = now - emitter.started

      if (difference >= emitter.hold) {
        emitter.emit('hold')
        clearInterval(emitter.timer)
      }
    }, 10)
  }

  function move(event){
    // prevent the window from rubber banding
    event.preventDefault()

    emitter.moving = true

    emitter.x = event.touches[0].pageX
    emitter.y = event.touches[0].pageY

    // emitter.moved = (new Date).getTime()
  }

  function end(event){
    emitter.emit('tap', emitter.x, emitter.y)
    reset()
  }

  function cancel(event){
    console.log('touch cancel')
  }

  function reset(){
    emitter.moving = false
    delete emitter.started
    delete emitter.moved

    if (emitter.timer) clearInterval(emitter.timer)
  }
}
