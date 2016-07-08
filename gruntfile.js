/**
 * Grunt dev helper and validator.
 * @author Ephraim Gregor
 */

module.exports = grunt => {
	'use strict';

	const appjs = [
		'*.js',
		'src/**/*.js'
	];

	grunt.initConfig({
		watch: {
			options: {
				spawn: false
			},
			js: {
				files: appjs,
				tasks: [ 'eslint', 'jscs' ]
			}
		},

		eslint: {
			target: appjs,
			options: {
				envs: [ 'node' ]
			}
		},
		jscs: {
			all: appjs
		}
	});

	// Sets watch to prevent exit.
	grunt.event.on( 'watch', function() {
		grunt.option( 'force', true );
	});

	require( 'load-grunt-tasks' )( grunt );

	grunt.registerTask( 'default', [ 'watch' ] );
	grunt.registerTask( 'validate', [ 'eslint', 'jscs' ] );
};
