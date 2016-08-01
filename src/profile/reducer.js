import { Map, List } from 'immutable';
import { combineReducers } from 'redux';

import * as actions from './actions';

const initialState = new Map({ id: null, name: '', offices: new List() });

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case actions.SET:
			return state.merge( action.payload );

		case actions.OFFICES:
			return state.set( 'offices', new List( action.payload ) );

		default:
			return state;
	}
}
