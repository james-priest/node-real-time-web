var url = require( 'url' );

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
console.log( searchURL );

// node o-build-url.js