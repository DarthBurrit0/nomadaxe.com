var Entity = require('./entity')

module.exports = Item
function Item() {
  Entity.call(this)
}

Item.prototype = Object.create(Entity.prototype, {
  hp: { value: 50 }
})
