/**
 * Redis is a non-blocking, in-memory, key-value data structure store used as a 
 * database, cache, and message broker.
 * It supports strings, hashes, lists, sets, sorted set, etc.
 */
var redis = require( 'redis' );
var client = redis.createClient();
var log = require( '../../javascript_exercises/cl' );

// key value
client.set( "msg1", "hello, yes this is dog." );
client.set( "msg2", "hello, no this is spider" );

client.get( "msg1", function( err, reply ) {
    console.log( reply );   // "hello, yes this is dog"
} );


// lists
client.del( "msgs" );

var msg1 = "hello, yes this is dog.";
var msg2 = "no this is spider";
var msg3 = "Oh sorry, wrong number";
client.lpush( "msgs", msg1, function( err, reply ) {
    console.log( reply );
} );
client.lpush( "msgs", msg2, function( err, reply ) {
    console.log( reply );
} );
client.lpush( "msgs", msg3, function( err, reply ) {
    log.cl( reply );
    client.ltrim( "msgs", 0, 1 );
    client.lrange( "msgs", 0, -1, function( err, msgs ) {
        log.cll('callback', msgs );
    } );
} );
log.cl();
client.lrange( "msgs", 0, -1, function( err, msgs ) {
    log.cll( 'non-blocked', msgs );
} );

// Sets
client.sadd( "names", "Dog" );
client.sadd( "names", "Spider" );
client.sadd( "names", "Gregg" );

client.smembers( "names", function( err, names ) {
    log.cll( "names", names );
    client.srem( "names", "Gregg", function( err, reply ) {
        client.smembers( "names", function( err, names ) {
            log.cll( "names 2", names );
        } );
    } );
} );
