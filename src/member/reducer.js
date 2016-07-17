import * as actions from './actions';
import { Members } from './models';

const initialState = new Members();

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
			return state.merge( action.payload );
		case actions.ERROR:
			console.error( action.payload );
			return state;
		default:
			return state;
	}
}
