import { Map } from 'immutable';
import { combineReducers } from 'redux';

import * as actions from './actions';
import { Profile } from './models';

const initialState = new Profile();

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case actions.REQUEST:
			return state.set( 'isFetching', true );
		case actions.RECEIVE:
			return state
			.merge( action.payload )
			.merge({
				lastUpdated: action.receivedAt,
				isFetching: false
			});
		case actions.ERROR:
			console.error( action.payload );
			return state;
		default:
			return state;
	}
}
