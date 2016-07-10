import { UPDATE } from './actions';
import { Profile } from './models';
import { Map } from 'immutable';

const initialState = new Profile();

export default ( state = initialState, action ) => {
	switch ( action.type ) {
		case UPDATE:
			return state.merge( action.payload );
		default:
			return state;
	}
};
