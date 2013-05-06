
var request = require('supertest')
  , server = require('../../lib/server')

describe('GET /bundle.css', function(){
  var url = '/bundle.css'

  it('responds 200 ok', function(done){
    request(server)
    .get(url)
    .expect(200, done)
  })

  it('has css', function(done){
    request(server)
    .get(url)
    .expect('content-type', 'text/css')
    .expect('content-length', /\d/)
    .expect(200, done)
  })

  xit('has an etag', function(done){
    request(server)
    .get(url)
    .expect('etag', /\w/)
    .expect(200, done)
  })

  describe('compression', function(){
    it('handles gzip')

    it('handles compress')
  })

  describe('cache', function(){
    it('responds 304 not modified')
  })
})
