import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import Immutable from 'immutable';
import ImmutableDevTools from 'immutable-devtools';

ImmutableDevTools( Immutable );

import reducer from './rootReducer';

import { Nav } from './nav';
import { Domain, Domains } from './domain';
import { Member, Members } from './member';
import { NoMatch } from './shared';
import { getCurrentUser } from './profile';

import './app.css';

class App extends React.Component {
	render() {
		return (
			<div>
				<header>
					<Nav />
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

store.dispatch( getCurrentUser() );

render(
	<Provider store={ store }>
		<Router history={ browserHistory }>
			<Route path='/' component={ App }>
				<IndexRoute component={ Member } id='me' />
				<Route path='domain'>
					<IndexRoute component={ Domains } />
					<Route path=':id' component={ Domain } />
					<Route path=':id/edit' component={ Domain } />
				</Route>
				<Route path='member'>
					<IndexRoute component={ Members } />
					<Redirect from='me' to='/' />
					<Route path=':id' component={ Member } />
					<Route path=':id/edit' component={ Member } editMode={ true } />
				</Route>
				<Route path='*' component={ NoMatch } />
			</Route>
		</Router>
	</Provider>,
	document.getElementById( 'app' )
);
