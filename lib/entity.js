var uuid = require('node-uuid');

module.exports = Entity;
function Entity() {}

Entity.prototype.create = function () {
    this.id = uuid.v4();
    this.x = 0;
    this.y = 0;
    return this;
}

Entity.prototype.getPosition = function () { return [this.x, this.y]; };
Entity.prototype.setPosition = function (x, y) { this.x = x; this.y = y; };
