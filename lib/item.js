var util = require('util'),
    Entity = require('./entity');

module.exports = Item;
util.inherits(Item, Entity);
function Item() {
    Item.super_.apply(this);
    this.hp = 100;
    return this;
}
