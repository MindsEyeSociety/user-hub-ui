import * as actions from './actions';
import { Domains } from './models';

const initialState = new Domains();

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case actions.REQUEST:
			let newState = state.set( 'isFetching', true );

			if ( action.id ) {
				newState = newState.setIn( [ 'items', action.id, 'isFetching' ], true );
			}
			return newState;

		case actions.RECEIVE:
			return state
			.setIn( [ 'items', action.id ], action.payload )
			.set( 'lastUpdated', action.receivedAt )
			.set( 'isFetching', false );

		case actions.RECEIVE_MANY:
			// Override invalid items only.
			let newItems = state.items.mergeWith(
				( p, n ) => p.didInvalidate ? n : p,
				action.payload
			);

			return state
			.set( 'items', newItems )
			.set( 'lastUpdated', action.receivedAt )
			.set( 'isFetching', false );

		case actions.ERROR:
			console.error( action.payload );
			return state;

		default:
			return state;
	}
}
