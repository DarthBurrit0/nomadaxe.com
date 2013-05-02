
var fs = require('graceful-fs')
  , path = require('path')
  , glob = require('glob')
  , EE = require('events').EventEmitter

module.exports = function(dir){
  return Object.create(EE.prototype, { walk: { value: walk }
  , stat: { value: stat }
  , read: { value: read }
  , finish: { value: finish }
  , wants: { value: wants }
  , queue: { value: [] }
  }).walk(dir)
}

function walk(dirname){
  var walker = this
    , gloptions = { cwd: dirname
      , strict: true
      }

  walker.cwd = dirname

  glob('**', gloptions, function(err, matches){
    if (err) return walker.emit('error', err)

    matches.forEach(function(match){
      if (match.length === 0) return
      else walker.stat(match)
    })
  })

  return walker
}

function stat(match){
  var walker = this
    , queue = walker.queue
    , pathname = path.join(walker.cwd, match)

  walker.queue.push(pathname)

  fs.stat(pathname, function(err, stats){
    if (err) return walker.emit('error', err)

    if (stats.isFile()) {
      var file = { filename: pathname, stats: stats }

      if (walker.wants('file')) walker.emit('file', file.filename)
      if (walker.wants('stat')) walker.emit('stat', file)

      // Don't read if there isn't a listener
      if (walker.wants('read')) walker.read(file)
      else walker.finish(file.filename)
    } else walker.finish(pathname)
  })
}

function read(file){
  var walker = this

  fs.readFile(file.filename, 'utf8', function(err, data){
    if (err) return walker.emit('error', err)

    file.data = data

    walker.emit('read', file)
    walker.finish(file.filename)
  })
}

// Shorthand for detecting listeners
function wants(event){
  return this.listeners(event).length > 0
}

function finish(pathname){
  var walker = this

  walker.queue.splice(walker.queue.indexOf(pathname), 1)
  if (walker.queue.length === 0) walker.emit('end')
}
