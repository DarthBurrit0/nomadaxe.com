
var domready = require('domready')
  , shoe = require('shoe')
  , sock = shoe('/sock')

domready(function(){
  console.log('Where am I?')

  sock.on('data', function(data){
    console.log(data)
  })
})
