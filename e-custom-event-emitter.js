var EventEmitter = require( 'events' ).EventEmitter;

// This logger will emit 'error', 'warn', and 'info' events
var logger = new EventEmitter();

// listen for error events
logger.on( 'error', function( message ) {
    console.log( 'ERR: ' + message );
} );

// to trigger or emit the event we call:
logger.emit( 'error', 'Spilled Milk' ); // ERR: Spilled Milk
logger.emit( 'error', 'Eggs Cracked' ); // Err: Eggs Cracked