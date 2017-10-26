var request = require( 'request' );
var url = require( 'url' );
var express = require( 'express' );

var app = express();
var options;

app.get( '/tweets/:username', function( req, res ) { // route definition

    var username = req.params.username; // :username = req.params.username

    options = {
        protocol: 'http',
        host: 'api.twitter.com',
        pathname: '/1/statuses/user_timeline.json',
        query: { screen_name: username, count: 10 }
    };

    var twitterUrl = url.format( options );
    request( twitterUrl ).pipe( res ); // pipe the request to response
} );

app.listen( 8080, function() {
    console.log( 'listening on http://localhost:8080' );
} );