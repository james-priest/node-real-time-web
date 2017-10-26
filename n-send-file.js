var express = require( 'express' );
var app = express();

app.get( '/tweets', function( request, response ) {
    response.sendFile( __dirname + '/c-index.html' );
} );

app.listen( 8080 );

// curl http://localhost:8080/tweets