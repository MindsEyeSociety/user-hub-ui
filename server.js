const express = require( 'express' );
const webpack = require( 'webpack' );
const path    = require( 'path' );

const app      = express();
const compiler = webpack( require( './webpack.config' ) );

app.use( '/static', express.static( 'dist' ) );

app.get( '*', ( req, res ) => {
	res.sendFile( path.resolve( __dirname, 'index.html' ) );
});

app.listen( 3000, 'localhost', err => {
	if ( err ) {
		return console.error( err );
	}
	console.log( 'Listening at http://localhost:3000' );
});
