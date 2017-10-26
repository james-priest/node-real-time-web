var fs = require( 'fs' );
var log = require( '../../javascript_exercises/cl' );

fs.readFile( './c-index.html', function( err, contents ) {
    log.cll( 'raw buffer', contents );
    log.cll( 'toString()', contents.toString() );
} );

console.log( "Doing something else." );