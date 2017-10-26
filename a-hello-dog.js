var http = require( 'http' );   // how we require modules

http.createServer( function( request, response ) {
    response.writeHead( 200 );  // status code in the header
    // response.write( "Hello, this is dog" ); //response body
    // response.end(); // close the connection
    response.end( "Hello, this is dog" );   // shortened
} ).listen( 8080, function() {  // listen for connections on this port
    console.log( "listening on port 8080" );
} );