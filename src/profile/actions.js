import { dispatch } from 'redux';

export const UPDATE = 'profile/UPDATE';

export const update = ( data ) => ({
	type: UPDATE,
	payload: data
});
