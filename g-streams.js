var http = require( 'http' );

// request is a readable stream
// response is a writable stream

http.createServer( function( request, response ) {  // <-- request event
    response.writeHead( 200 );
    
    // Both of these readable and writable events can be replaced with...
    request.on( 'readable', function() {
        var chunk = null;
        while ( null !== ( chunk = request.read() )) {
            console.log( chunk.toString() );
            response.write( chunk );    // don't need to call toString function
        }
    } );
    request.on( 'end', function() {
        response.end();
    } );

    console.log( "Request received." ); 
} ).listen( 8080, function() {
    console.log( 'Server running.' );
} );

// curl http://localhost:8080 -d 'hello'