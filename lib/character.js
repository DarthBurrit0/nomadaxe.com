var Entity = require('./entity')

module.exports = Character
function Character() {
  Entity.call(this)
}

Character.prototype = Object.create(Entity.prototype, {
  name: { value: '' },
  hp: { value: 100 },
  inventory: { value: {} }
})
