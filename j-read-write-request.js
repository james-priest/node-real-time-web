var fs = require( 'fs' );
var http = require( 'http' );

http.createServer( function( request, response ) {
    var newFile = fs.createWriteStream( 'j-read-write-request.md' );
    request.pipe( newFile );

    request.on( 'end', function() {
        response.end('uploaded!');
    } );
} ).listen( 8080, function() {
    console.log( 'Server running...' );
});


// curl http://localhost:8080 --uploaded-file README.md