var util = require('util'),
    Entity = require('./entity');

module.exports = Character;
util.inherits(Character, Entity);
function Character() {
    Character.super_.apply(this);
    this.hp = 100;
    this.inventory = {};
}
