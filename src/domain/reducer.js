import * as actions from './actions';
import { Domains } from './models';

const initialState = new Domains();

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case actions.REQUEST:
			return state.set( 'isFetching', true );
		case actions.RECEIVE:
			return state
				.setIn( [ 'items', action.id ], action.payload )
				.set( 'lastUpdated', action.receivedAt )
				.set( 'isFetching', false );
		case actions.RECEIVE_MANY:
		case actions.INSERT_MANY:
			return state.mergeDeep( action.payload );
		case actions.ERROR:
			console.error( action.payload );
			return state;
		default:
			return state;
	}
}
