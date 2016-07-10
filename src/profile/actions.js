import { dispatch } from 'redux';
import { Profile } from './model';

export const UPDATE = 'profile/UPDATE';

export const update = ( data ) => ({
	type: UPDATE,
	payload: new Profile( data )
});
