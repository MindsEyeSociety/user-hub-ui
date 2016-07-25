const express  = require( 'express' );
const path     = require( 'path' );
const readFile = require( 'fs' ).readFile;

const app     = express();
const config  = require( './config.json' );

app.use( '/static', express.static( 'dist' ) );

/**
 * @TODO Add logic to log user in before presenting logic layer.
 */

app.get( '*', ( req, res ) => {
	readFile(
		path.resolve( __dirname, 'index.html' ),
		'utf-8',
		( err, html ) => {
			if ( err ) {
				console.log( err );
				res.status( 500 ).send( 'We\'re sorry, something seems to have gone wrong.' );
			} else {
				res
				.set( 'Content-Header', 'text/html' )
				.send( html.replace( '{}', JSON.stringify( config ) ) );
			}
		}
	);
});

const port = process.env.PORT || '8080';

app.listen( port, err => {
	if ( err ) {
		return console.error( err );
	}
	console.log( 'Listening at http://localhost:' + port );
});
