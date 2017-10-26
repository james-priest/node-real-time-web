var http = require( 'http' );   // how we require modules

var server = http.createServer();
    
server.on( 'request', function( request, response ) {
    response.writeHead( 200, { 'Content-Type': 'text/plain' } );
    response.write( "Hello, this is dog" ); //response body
    response.end(); // close the connection
} );

server.on( 'request', function( req, res ) {
    console.log( "New request coming in..." );
} );

server.on( 'close', function() {
    console.log("Closing down the server...");    
} );

server.listen( 8080 );