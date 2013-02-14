var uuid = require('node-uuid');

module.exports = Entity;
function Entity() {
    this.id = uuid.v4()
    this.x = 0
    this.y = 0
}

Entity.prototype = {
  getPosition: function () { return [this.x, this.y] },
  setPosition: function (x, y) { this.x = x; this.y = y; }
}
