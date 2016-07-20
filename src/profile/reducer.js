import { Map } from 'immutable';
import { combineReducers } from 'redux';

import * as actions from './actions';

const initialState = new Map({ id: null, name: '' });

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case actions.SET:
			return state.merge( action.payload );
		default:
			return state;
	}
}
