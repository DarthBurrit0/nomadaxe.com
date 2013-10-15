;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"domready":2,"image-loaded":3}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
},{}],3:[function(require,module,exports){
/*
 * Modified version of http://github.com/desandro/imagesloaded v2.1.1
 * MIT License. by Paul Irish et al.
 */

var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function loaded(image, callback) {
  var src
    , old
    , onload

  if (!image.nodeName) return callback(new Error('First argument must be an image element'))
  if (image.nodeName.toLowerCase() !== 'img') return callback(new Error('Element supplied is not an image'))
  if (image.src  && image.complete && image.naturalWidth !== undefined) return callback(null, true)

  old = !image.addEventListener

  function loaded() {
    if (old) {
      image.detachEvent('onload', loaded)
    } else {
      image.removeEventListener('load', loaded, false)
    }
    callback(null, false)
  }

  if (old) {
    image.attachEvent('onload', loaded)
  } else {
    image.addEventListener('load', loaded, false)
  }

  if (image.readyState || image.complete) {
    src = image.src
    image.src = BLANK
    image.src = src
  }
}

module.exports = loaded

},{}]},{},[1])
;