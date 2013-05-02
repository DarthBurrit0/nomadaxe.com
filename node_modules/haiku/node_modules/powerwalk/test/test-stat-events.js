
var assert = require('assert')
  , powerwalk = require('../')
  , path = require('path')
  , fixtures = path.resolve(__dirname, './fixtures')

describe('stat events', function(){
  var files = []

  before(function(done){
    powerwalk(fixtures)
    .on('error', done)
    .on('stat', function(file){ files.push(file) })
    .on('end', done)
  })

  it('emits stats recursively', function(){
    assert.equal(files.length, 4)

    files.forEach(function(f){
      assert.equal(typeof f, 'object')
      assert.equal(typeof f.filename, 'string')
      assert.equal(typeof f.stats, 'object')
    })
  })
})
