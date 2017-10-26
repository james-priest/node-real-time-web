var http = require( 'http' );

http.createServer( function( request, response ) {  // <-- request event
    response.writeHead( 200 ); 
    response.write( "Dog is running." ); 
    setTimeout( function() {                        // <-- timeout event
        // represents long-running process
        response.write( "\nDog is done." );
        response.end(); 
    }, 5000 ); 
} ).listen( 8080, function() {
    console.log( "listening on port 8080" );
} );