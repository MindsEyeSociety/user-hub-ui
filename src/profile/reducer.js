import { UPDATE } from './actions';
import { Map } from 'immutable';

const initialState = Map();

export default ( state = initialState, action ) => {
	switch ( action.type ) {
		case UPDATE:
			return state.merge( action.payload );
		default:
			return state;
	}
};
