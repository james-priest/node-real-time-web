var url = require( 'url' );
var request = require( 'request' );

// Build this url:
// http://search.twitter.com/search.json?q=codeschool

var options = {
    // add URL options here
    protocol: 'http:',
    host: 'search.twitter.com',
    pathname: 'search.json',
    query: {
        q: 'codeschool'
    }

};

var searchURL = url.format( options );

request( searchURL, function( error, response, body ) {
    console.log( body );
} );

// node o-build-url2.js