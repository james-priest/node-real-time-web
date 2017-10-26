var events = require( 'events' );
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();
var users = [], chatlog = [];

chat.on( 'message', function( message ) {
    console.log( message );
} );

chat.on( 'join', function( nickname ) {
    users.push( nickname );
} );

// Emit events here
chat.emit('join', 'James');
chat.emit('message', 'Welcome');