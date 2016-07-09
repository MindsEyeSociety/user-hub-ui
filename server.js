const express = require( 'express' );
const path    = require( 'path' );

const app     = express();

app.use( '/static', express.static( 'dist' ) );

/**
 * @TODO Add logic to log user in before presenting logic layer.
 */

app.get( '*', ( req, res ) => {
	res.sendFile( path.resolve( __dirname, 'index.html' ) );
});

const port = process.env.PORT || '8080';

app.listen( port, 'localhost', err => {
	if ( err ) {
		return console.error( err );
	}
	console.log( 'Listening at http://localhost:' + port );
});
