const express      = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const path         = require( 'path' );
const readFile     = require( 'fs' ).readFile;
const url          = require( 'url' );

const app     = express();
const config  = require( './config.json' );

app.use( '/static', express.static( 'dist' ) );
app.use( cookieParser() );

app.get( '*', ( req, res ) => {

	// Remove trailing query var. Mostly for looks.
	if ( req.query.token ) {
		return res.redirect( url.parse( req.url ).pathname );
	}

	// Get a token if one doesn't exist.
	if ( ! req.cookies.token ) {
		res.cookie( 'path', url.parse( req.url ).pathname );
		return res.redirect( config.hubUrl + '/auth/signin/' + config.clientKey );
	}

	// Restore the original path, if set.
	if ( req.cookies.path ) {
		res.clearCookie( 'path' );
		// We're parsing in order to prevent redirects outside of the domain.
		return res.redirect( url.parse( req.cookies.path ).pathname );
	}

	// Display the actual HTML.
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
				.send( html.replace( '{}', JSON.stringify( config ) ) ); // Set the config.
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
