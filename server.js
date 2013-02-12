var god  = require('./lib/god'); // god is an event emitter.

god.on('character:created', function (message) {
    console.log('Character has been created!!!');
    console.log(message);
});

god.on('item:created', function (message) {
    console.log('Item has been created!!!');
    console.log(message);
});

var c = god.create('character');
var i = god.create('item');
