const webpack = require( 'webpack' );
const path    = require( 'path' );

const src  = path.resolve( __dirname, 'src' );
const dist = path.resolve( __dirname, 'dist' );

var config = {
	entry: path.join( src, 'app.js' ),
	output: {
		path: dist,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: src,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				include: src,
				loader: 'style-loader!css-loader'
			}
		]
	}
};

module.exports = config;