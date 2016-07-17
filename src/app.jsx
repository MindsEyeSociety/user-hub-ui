import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import Immutable from 'immutable';
import ImmutableDevTools from 'immutable-devtools';

ImmutableDevTools( Immutable );

import reducer from './rootReducer';

import { Nav } from './nav';
import { Profile } from './profile';
import { Domain, Domains } from './domain';
import { Member, Members } from './member';
import { NoMatch } from './shared';

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
					<Nav items={ navItems } />
				</header>
				{ this.props.children }
			</div>
		);
	}
}

let store = createStore(
	reducer,
	applyMiddleware(
		thunkMiddleware,
		createLogger()
	)
);

render(
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path='/' component={ App}>
				<IndexRoute component={ Profile } />
				<Route path='domain'>
					<IndexRoute component={ Domains } />
					<Route path=':id' component={ Domain } />
					<Route path=':id/edit' component={ Domain } />
				</Route>
				<Route path='member'>
					<IndexRoute component={ Members } />
					<Route path=':id' component={ Member } />
					<Route path=':id/edit' component={ Member } editMode={ true } />
				</Route>
				<Route path='*' component={ NoMatch } />
			</Route>
		</Router>
	</Provider>,
	document.getElementById( 'app' )
);
