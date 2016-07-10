import React from 'react';
import { Link } from 'react-router';

export const NoMatch = React.createClass({
	render: function() {
		return (
			<main id='app'>
				<h1>404 Page Not Found</h1>
				<p>And who said Direction Sense wasn't helpful&hellip;?</p>
				<p><Link to='/'>Head back to my profile here.</Link></p>
			</main>
		);
	}
});
