var fs = require( 'fs' );

var file = fs.createReadStream( "README.md" );
var newFile = fs.createWriteStream( 'README_copy.md' );

file.pipe( newFile );