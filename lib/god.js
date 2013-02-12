var EE = require('events').EventEmitter,
    util = require('util'),
    Character = require('./character'),
    Item = require('./item');

util.inherits(God, EE);
module.exports = new God();
function God() {
    this.character = new Character();
    this.item = new Item();
}

God.prototype.create = function (type, o) {
    o = o || {};
    var creation = this[type].create(o);

    // this should probably just be created. type can be checked in the payload.
    this.emit(type+':created', creation); // let the world know about my creations
    return creation;
}
