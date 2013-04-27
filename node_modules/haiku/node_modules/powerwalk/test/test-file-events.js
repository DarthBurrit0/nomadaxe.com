
var assert = require('assert')
  , powerwalk = require('../')
  , path = require('path')
  , fixtures = path.resolve(__dirname, './fixtures')

describe('file events', function(){
  var files = []

  before(function(done){
    powerwalk(fixtures)
    .on('error', done)
    .on('file', function(filename){ files.push(filename) })
    .on('end', done)
  })

  it('emits filenames recursively', function(){
    assert.equal(files.length, 4)

    files.forEach(function(f){
      assert.equal(typeof f, 'string')
    })
  })
})
