import * as actions from './actions';
import { Domains, Domain } from './models';

const initialState = new Domains();

export default function( state = initialState, action ) {
	switch ( action.type ) {
		case actions.REQUEST:
			return state.updateIn(
				[ 'items', action.id ],
				new Domain({ id: action.id }),
				domain => domain.set( 'isFetching', true )
			);

		case actions.RECEIVE:
		case actions.CREATE:
			return state
				.deleteIn( [ 'items', action.id ] )
				.setIn( [ 'items', action.payload.id ], action.payload );

		case actions.REQUEST_MANY:
			return state.set( 'isFetching', true );

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
