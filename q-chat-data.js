/**
 * Socket.io with data persistance
 * We add messages array to store latest 10 messages 
 */

var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );

var options = { root: 'd:/users/james/documents/GitHub/james-priest/code-exercises/' };
var messages = [];  // store,messages in array

var storeMessages = function( name, data ) {
    messages.push( { name: name, data: data } ); // add message to end of array
    if ( messages.length > 10 ) {
        messages.shift();   // if more than ten, remove first one
    }
};

io.on( 'connection', function( client ) {
    console.log( 'Client connected...' );
    client.on( 'join', function( name ) {
        client.nickname = name;
        console.log( client.nickname + " joined the chat" );
        messages.forEach( function( message ) {
            client.emit( "messages", message.name + ": " + message.data );
        } );    // On join, iterate thru messages array and emit a message for each one
    } );
    client.on( 'messages', function( data ) {       // listen for client messages
        var nick = client.nickname;
        console.log( nick + " said:", data );
        client.broadcast.emit( "messages", nick + ": " + data );
        client.emit( "messages", nick + ": " + data );
        storeMessages( nick, data );
    } );
} );

app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/q-index.html' );
} );
app.get( '/socket.io/socket.io.js', function( req, res ) {
    res.sendFile( 'node_modules/socket.io-client/dist/socket.io.js', options );
} );
app.get( '/scripts/jquery.js', function( req, res ) {
    res.sendFile( 'node_modules/jquery/dist/jquery.js', options );
} );

server.listen( 8080, function() {
    console.log( "  info - socket.io started" );
} );

// Browser to http://localhost:8080/