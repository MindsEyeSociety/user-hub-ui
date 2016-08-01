import * as actions from './actions';
import { Offices, Office } from './models';

const initialState = new Offices();

export default function( state = initialState, action ) {
	switch ( action.type ) {

		case actions.REQUEST:
			return state.updateIn(
				[ 'items', action.id ],
				new Office({ id: action.id }),
				office => office.set( 'isFetching', true )
			);

		case actions.RECEIVE:
			return state.setIn( [ 'items', action.id ], action.payload );

		case actions.REQUEST_MANY:
			return state.set( 'isFetching', true );

		case actions.RECEIVE_MANY:
			return state.merge( action.payload );

		case actions.ERROR:
			console.error( action.payload );
			return state;

		default:
			return state;
	}
}
