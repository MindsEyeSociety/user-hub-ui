const webpack = require( 'webpack' );
const fs      = require( 'fs' );
const path    = require( 'path' );
const join    = path.join;
const resolve = path.resolve;

const getConfig = require( 'hjs-webpack' );

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = 'development' === process.env.NODE_ENV;

const root = resolve( __dirname );
const src  = join( root, 'src' );

var config = getConfig({
	isDev: isDev,
	in: join( src, 'app.js' ),
	out: join( root, 'dist' ),
	clearBeforeBuild: true
});

config.postcss = [].concat([
	require( 'precss' )({}),
	require( 'autoprefixer' )({}),
	require( 'cssnano' )({})
]);

config.devServer = {
	port: 8080,
	hostname: 'localhost',
	https: false
};

module.exports = config;
