/**
 * Socket.io
 * 1. require express module
 * 2. initialize an express application
 * 3. create an http server and have it dispatch requests to express
 * 4. require the socket.io module and allow it to use the http server to listen for requests
 *
 * Now socket.io and express are sharing the same http server.
 * We then need to listen for connection events and log out to the console.
 * We'll emit the 'messages' event on the client
 * We'll server our p-index.html file using the the response.sendFile function.
 * We serve the socket.io.js file using a route as well.
 * Lastly, we'll have our server listen on port 8080
 */

var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );

var options = { root: 'd:/users/james/documents/GitHub/james-priest/code-exercises/' };

io.on( 'connection', function( client ) {
    console.log( 'Client connected...' );
    client.on( 'join', function( name ) {
        client.nickname = name;
        console.log( client.nickname + " joined.");
    } );
    client.on( 'messages', function( data ) {       // listen for client messages
        var nick = client.nickname;

        client.broadcast.emit( "messages", nick + ": " + data );
        client.emit( "messages", nick + ": " + data );
    } );
} );

app.get( '/', function( req, res ) {
    res.sendFile( __dirname + '/p-index.html' );
} );
app.get( '/socket.io/socket.io.js', function( req, res ) {
    res.sendFile( 'node_modules/socket.io-client/dist/socket.io.js', options );
} );
app.get( '/scripts/jquery.js', function( req, res ) {
    res.sendFile( 'node_modules/jquery/dist/jquery.js', options );
} );

server.listen( 8080, function() {
    console.log( "server running..." );
} );

// Browser to http://localhost:8080/