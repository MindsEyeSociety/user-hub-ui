import { UPDATE } from './actions';
import Model from './model';
import { Map } from 'immutable';

const initialState = new Model();

export default ( state = initialState, action ) => {
	switch ( action.type ) {
		case UPDATE:
			return state.merge( action.payload );
		default:
			return state;
	}
};
