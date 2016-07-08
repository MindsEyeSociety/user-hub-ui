import React from 'react';
import {render} from 'react-dom';
import {Nav} from './components/nav';

import './app.css';

class App extends React.Component {
	render() {
		let navItems = [
			{ href: '/', name: 'Profile' },
			{ href: '/domain', name: 'Domains' },
			{ href: '/member', name: 'Members' },
			{ href: '/office', name: 'Offices' }
		];
		return (
			<div>
				<Nav items={navItems} />
				<div>Text text text</div>
			</div>
		);
	}
}

render( <App />, document.getElementById( 'app' ) );
