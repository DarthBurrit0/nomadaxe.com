var EE = require('events').EventEmitter
  , Character = require('./character')
  , Item = require('./item')

function God() {}

function create(type, o) {
  o = o || {};
  var creation = new this[type]()

  // this should probably just be created. type can be checked in the payload.
  this.emit(type+':created', creation); // let the world know about my creations
  return creation;
}

God.prototype = Object.create(EE.prototype, {
  create: {
    value: create
  },
    
  character: {
    value: Character
  },

  item: {
    value: Item
  }
})

module.exports = new God();
