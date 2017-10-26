var http = require( 'http' );
var fs = require( 'fs' );

http.createServer( function( request, response ) {
    var newFile = fs.createWriteStream( 'k-file-upload.jpg' );
    var fileBytes = request.headers[ 'content-length' ];
    var uploadedBytes = 0;

    // only reason to listen for 'readable' is to send progress to client
    request.on( 'readable', function() {
        var chunk = null;
        while ( null !== ( chunk = request.read() ) ) {
            uploadedBytes += chunk.length;
            var progress = ( uploadedBytes / fileBytes ) * 100;
            response.write( "progress: " + parseInt( progress, 10 ) + "%\n" );
        }
    } );

    // this handles the saving of the file without needing to listen for 'readable'
    request.pipe( newFile );

    // always need to close the stream
    request.on( 'end', function() {
        response.end( 'uploaded!' );
    } );
} ).listen( 8080, function() {
    console.log( "Server running..." );
} );

// curl http://localhost:8080 --upload-file j-file.jpg