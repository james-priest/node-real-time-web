var express = require( 'express' );

var app = express();

app.get( '/', function( request, response ) {
    response.sendFile( __dirname + "/c-index.html" );
} );

app.listen( 8080, function() {
    console.log( "Server started..." );
});
