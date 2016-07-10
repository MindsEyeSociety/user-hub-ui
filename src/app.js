import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './rootReducer';

import { Nav } from './nav';
import { Profile } from './profile';
import { Domains } from './domain';
import { Members } from './member';

import './app.css';

const navItems = [
	{ href: '/', name: 'Profile' },
	{ href: '/domain', name: 'Domains' },
	{ href: '/member', name: 'Members' },
	{ href: '/office', name: 'Offices' }
];

class App extends React.Component {
	render() {
		return (
			<div>
				<header>
					<Nav items={navItems} />
				</header>
				{this.props.children}
			</div>
		);
	}
}

let store = createStore( reducer );

render(
	<Provider store={ store }>
		<Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Profile} />
				<Route path='domain' component={Domains} />
				<Route path='member' component={Members} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById( 'app' )
);
