/**
 * Socket.io with redis
 */

var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );
var redis = require( 'redis' );
var redisClient = redis.createClient();

var options = { root: 'd:/users/james/documents/GitHub/james-priest/code-exercises/' };
var messages = [];  // store,messages in array

var storeMessages = function( name, data ) {
    var message = JSON.stringify( { name: name, data: data } ); 
    redisClient.lpush( "messages", message, function( err, reply ) { // push new item
        redisClient.ltrim( "messages", 0, 9 );  // keep newest 10 items in array
    } );
};

io.on( 'connection', function( client ) {
    console.log( 'Client connected...' );
    client.on( 'join', function( name ) {
        redisClient.lrange( "messages", 0, -1, function( err, messages ) {
            messages.reverse();
            messages.forEach( function( message ) {
                message = JSON.parse( message );    // parse into JSON object
                client.emit( "messages", message.name + ": " + message.data );
            } ); // On join, iterate thru messages array and emit a message for each one
        } );
        client.nickname = name;
        console.log( client.nickname + " joined the chat" );
        client.broadcast.emit( "add chatter", name ); // notify clients a chatter joined

        redisClient.smembers( 'chatters', function( err, names ) {
            names.forEach( function( name ) {
                client.emit( 'add chatter', name );
            } );
        } );
        // client.emit( "add chatter", name ); // notify self
        redisClient.sadd( "chatters", name );   // add name to chatters set
    } );
    client.on( 'messages', function( data ) {       // listen for client messages
        var nick = client.nickname;
        console.log( nick + " said:", data );
        client.broadcast.emit( "messages", nick + ": " + data );
        client.emit( "messages", nick + ": " + data );
        storeMessages( nick, data );
    } );
    client.on( 'disconnect', function( name ) {
        // client.get( 'nickname', function( err, name ) {
        client.broadcast.emit( "remove chatter", name );
        // });
        redisClient.srem( "chatters", name );
        console.log( name + " disconnected." );
    } );
} );

app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/s-index.html' );
} );
app.get( '/socket.io/socket.io.js', function( req, res ) {
    res.sendFile( 'node_modules/socket.io-client/dist/socket.io.js', options );
} );
app.get( '/scripts/jquery.js', function( req, res ) {
    res.sendFile( 'node_modules/jquery/dist/jquery.js', options );
} );
app.get( '/css/style.css', function( req, res ) {
    res.sendFile( 'node/real-time-web/css/style.css', options );
} );

server.listen( 8080, function() {
    console.log( "  info - socket.io started" );
} );

// Browser to http://localhost:8080/